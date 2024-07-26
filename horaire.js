const branches = [
  { nom: 'Promedis Debonhomme', services: ['CPN', 'CPS', 'Pédiatrie', 'Échographie', 'Radio', 'Kinésithérapie'] },
  { nom: 'Promedis Limete', services: ['CPN', 'CPS', 'Dentisterie', 'Ophtalmologie', 'ORL', 'Orthopédie', 'Dermatologie', 'Neurologie', 'Kinésithérapie', 'Interniste Dr Bima', 'Dr Kimpuatu', 'Gynécologie Dr Ndandu', 'Dr Messia', 'Pédiatrie', 'Radio', 'Échographie'] },
  { nom: 'Promedis Cite', services: ['CPN', 'CPS', 'Pédiatrie', 'Interniste', 'Échographie'] },
  { nom: 'Promedis Kinkole', services: ['CPN', 'CPS', 'Pédiatrie', 'Interniste', 'Échographie'] },
  { nom: 'Promedis Matete', services: ['CPN', 'CPS', 'Pédiatrie', 'Interniste', 'Échographie'] }
];

const doctors = {
  'Promedis Debonhomme': {
    'CPN': ['Dr A', 'Dr B'],
    'CPS': ['Dr C', 'Dr D'],
    'Pédiatrie': ['Dr E', 'Dr F'],
    'Échographie': ['Dr G', 'Dr H'],
    'Radio': ['Dr I', 'Dr J'],
    'Kinésithérapie': ['Dr K', 'Dr L']
  },
  'Promedis Limete': {
    'CPN': ['Dr M', 'Dr N'],
    'Dentisterie': ['Dr O', 'Dr P'],
    'Pédiatrie': ['Dr Q', 'Dr R'],
    'Ophtalmologie': ['Dr S', 'Dr T'],
    'ORL': ['Dr U', 'Dr V'],
    'Orthopédie': ['Dr W', 'Dr X'],
    'Dermatologie': ['Dr Y', 'Dr Z'],
    'Neurologie': ['Dr AA', 'Dr BB'],
    'Kinésithérapie': ['Dr CC', 'Dr DD'],
    'Interniste Dr Bima': ['Dr EE'],
    'Dr Kimpuatu': ['Dr FF'],
    'Gynécologie Dr Ndandu': ['Dr GG'],
    'Dr Messia': ['Dr HH'],
    'Radio': ['Dr II'],
    'Échographie': ['Dr JJ']
  },
  'Promedis Cite': {
    'CPN': ['Dr KK', 'Dr LL'],
    'Pédiatrie': ['Dr MM', 'Dr NN'],
    'Interniste': ['Dr OO', 'Dr PP'],
    'Échographie': ['Dr QQ', 'Dr RR']
  },
  'Promedis Kinkole': {
    'CPN': ['Dr SS', 'Dr TT'],
    'Pédiatrie': ['Dr UU', 'Dr VV'],
    'Interniste': ['Dr WW', 'Dr XX'],
    'Échographie': ['Dr YY', 'Dr ZZ']
  },
  'Promedis Matete': {
    'CPN': ['Dr AAA', 'Dr BBB'],
    'Pédiatrie': ['Dr CCC', 'Dr DDD'],
    'Interniste': ['Dr EEE', 'Dr FFF'],
    'Échographie': ['Dr GGG', 'Dr HHH']
  }
};

const branchSelect = document.getElementById('branchSelect');
const serviceSelect = document.getElementById('serviceSelect');
const doctorSelect = document.getElementById('doctorSelect');
const scheduleList = document.getElementById('scheduleList');

// Populate branchSelect dropdown
branches.forEach(branch => {
  const option = document.createElement('option');
  option.value = branch.nom;
  option.textContent = branch.nom;
  branchSelect.appendChild(option);
});

function updateServices() {
  serviceSelect.innerHTML = '<option value="">Sélectionner un service</option>';
  doctorSelect.innerHTML = '<option value="">Sélectionner un docteur</option>';

  const selectedBranch = branchSelect.value;
  if (selectedBranch) {
    const branchData = branches.find(branch => branch.nom === selectedBranch);
    if (branchData) {
      branchData.services.forEach(service => {
        const option = document.createElement('option');
        option.value = service;
        option.textContent = service;
        serviceSelect.appendChild(option);
      });
    }
  }
}

function updateDoctors() {
  doctorSelect.innerHTML = '<option value="">Sélectionner un docteur</option>';

  const selectedBranch = branchSelect.value;
  const selectedService = serviceSelect.value;

  if (selectedBranch && selectedService) {
    const branchDoctors = doctors[selectedBranch];
    if (branchDoctors) {
      const branchServiceDoctors = branchDoctors[selectedService];
      if (branchServiceDoctors) {
        branchServiceDoctors.forEach(doctor => {
          const option = document.createElement('option');
          option.value = doctor;
          option.textContent = doctor;
          doctorSelect.appendChild(option);
        });
      }
    }
  }
}

function saveSchedule(event) {
  event.preventDefault();
  const selectedBranch = branchSelect.value || 'Toutes les succursales';
  const selectedService = serviceSelect.value;
  const selectedDoctor = doctorSelect.value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const scheduleId = document.getElementById('scheduleId').value;

  if (selectedService && date && time) {
    if (scheduleId) {
      // Update existing schedule
      const scheduleItem = document.getElementById(scheduleId);
      scheduleItem.querySelector('.card-body').innerHTML = `
        ${selectedBranch} - ${selectedService} - ${selectedDoctor} : ${date} à ${time}
        <button onclick="editSchedule('${scheduleId}')" class="btn btn-warning btn-sm mt-2">Modifier</button>
        <button onclick="deleteSchedule('${scheduleId}')" class="btn btn-danger btn-sm mt-2">Supprimer</button>
        <button onclick="publishSchedule('${scheduleId}')" class="btn btn-success btn-sm mt-2">Publier</button>
      `;
    } else {
      // Create new schedule
      const newScheduleId = Date.now().toString();
      const scheduleItem = document.createElement('div');
      scheduleItem.className = 'col-md-4';
      scheduleItem.id = newScheduleId;
      scheduleItem.innerHTML = `
        <div class="card">
          <div class="card-body">
            ${selectedBranch} - ${selectedService} - ${selectedDoctor} : ${date} à ${time}
            <button onclick="editSchedule('${newScheduleId}')" class="btn btn-warning btn-sm mt-2">Modifier</button>
            <button onclick="deleteSchedule('${newScheduleId}')" class="btn btn-danger btn-sm mt-2">Supprimer</button>
            <button onclick="publishSchedule('${newScheduleId}')" class="btn btn-success btn-sm mt-2">Publier</button>
          </div>
        </div>
      `;
      scheduleList.appendChild(scheduleItem);
    }
    resetForm();
  } 
}

function editSchedule(scheduleId) {
  const scheduleItem = document.getElementById(scheduleId);
  const [branchServiceDoctor, dateTime] = scheduleItem.querySelector('.card-body').textContent.split(' : ');
  const [branchService, doctor] = branchServiceDoctor.split(' - ');
  const [branch, service] = branchService.split(' - ');
  const [date, time] = dateTime.split(' à ');

  branchSelect.value = branch.trim();
  updateServices();
  serviceSelect.value = service.trim();
  updateDoctors();
  doctorSelect.value = doctor.trim();

  document.getElementById('date').value = date.trim();
  document.getElementById('time').value = time.trim();
  document.getElementById('scheduleId').value = scheduleId;
}

function deleteSchedule(scheduleId) {
  const scheduleItem = document.getElementById(scheduleId);
  scheduleItem.remove();
  resetForm();
}

function publishSchedule(scheduleId) {
  const scheduleItem = document.getElementById(scheduleId);
  const publishButton = scheduleItem.querySelector('.btn-success');
  publishButton.textContent = 'Publié';
  publishButton.disabled = true;
}

function resetForm() {
  document.getElementById('scheduleForm').reset();
  document.getElementById('scheduleId').value = '';
  updateServices();
  updateDoctors();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  updateServices(); // Populate services for initial branch
});

branchSelect.addEventListener('change', () => {
  updateServices();
  serviceSelect.value = ''; // Reset service selection
  doctorSelect.innerHTML = '<option value="">Sélectionner un docteur</option>'; // Reset doctor options
});

serviceSelect.addEventListener('change', updateDoctors);
document.getElementById('scheduleForm').addEventListener('submit', saveSchedule);
