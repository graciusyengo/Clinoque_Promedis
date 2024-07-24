const branches = [
  {
    name: 'Promedis Debonhomme',
    services: ['CPN', 'CPS', 'Pédiatrie', 'Échographie', 'Radio', 'Kinésithérapie']
  },
  {
    name: 'Promedis Limete',
    services: ['CPN', 'CPS', 'Dentisterie', 'Ophtalmologie', 'ORL', 'Orthopédiste', 'Dermatologie', 'Neurologie', 'Kinésithérapie', 'Interniste Dr Bima', 'Dr Kimpuatu', 'Gynécologie Dr Ndandu', 'Dr Messia', 'Pédiatrie', 'Radio', 'Échographie']
  },
  {
    name: 'Promedis Cite',
    services: ['CPN', 'CPS', 'Pédiatrie', 'Interniste', 'Échographie']
  },
  {
    name: 'Promedis Kinkole',
    services: ['CPN', 'CPS', 'Pédiatrie', 'Interniste', 'Échographie']
  },
  {
    name: 'Promedis Matete',
    services: ['CPN', 'CPS', 'Pédiatrie', 'Interniste', 'Échographie']
  }
];

const branchSelect = document.getElementById('branchSelect');
const serviceSelect = document.getElementById('serviceSelect');
const scheduleList = document.getElementById('scheduleList');

branches.forEach(branch => {
  const option = document.createElement('option');
  option.value = branch.name;
  option.textContent = branch.name;
  branchSelect.appendChild(option);
});

function updateServices() {
  serviceSelect.innerHTML = '<option value="">Sélectionner un service</option>';
  const selectedBranch = branchSelect.value;
  if (selectedBranch) {
    const branch = branches.find(branch => branch.name === selectedBranch);
    if (branch) {
      branch.services.forEach(service => {
        const option = document.createElement('option');
        option.value = service;
        option.textContent = service;
        serviceSelect.appendChild(option);
      });
    }
  } else {
    branches.forEach(branch => {
      branch.services.forEach(service => {
        const option = document.createElement('option');
        option.value = service;
        option.textContent = service;
        serviceSelect.appendChild(option);
      });
    });
  }
}

function saveSchedule(event) {
  event.preventDefault();
  const selectedBranch = branchSelect.value || 'Toutes les succursales';
  const selectedService = serviceSelect.value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const scheduleId = document.getElementById('scheduleId').value;

  if (selectedService && date && time) {
    if (scheduleId) {
      // Update existing schedule
      const scheduleItem = document.getElementById(scheduleId);
      scheduleItem.querySelector('.card-body').innerHTML = `${selectedBranch} - ${selectedService} : ${date} à ${time}
        <button onclick="editSchedule('${scheduleId}')" class="btn btn-sm btn-warning float-end">Modifier</button>
        <button onclick="deleteSchedule('${scheduleId}')" class="btn btn-sm btn-danger float-end me-2">Supprimer</button>
        <button onclick="publishSchedule('${scheduleId}')" class="btn btn-sm btn-success float-end me-2">Publier</button>`;
    } else {
      // Create new schedule
      const newScheduleId = Date.now().toString();
      const scheduleItem = document.createElement('div');
      scheduleItem.className = 'col-md-4';
      scheduleItem.id = newScheduleId;
      scheduleItem.innerHTML = `
        <div class="card">
          <div class="card-body">
            ${selectedBranch} - ${selectedService} : ${date} à ${time}
            <button onclick="editSchedule('${newScheduleId}')" class="btn btn-sm btn-warning float-end">Modifier</button>
            <button onclick="deleteSchedule('${newScheduleId}')" class="btn btn-sm btn-danger float-end me-2">Supprimer</button>
            <button onclick="publishSchedule('${newScheduleId}')" class="btn btn-sm btn-success float-end me-2">Publier</button>
          </div>
        </div>`;
      scheduleList.appendChild(scheduleItem);
    }
    resetForm();
  }
}

function editSchedule(scheduleId) {
  const scheduleItem = document.getElementById(scheduleId);
  const [branchService, dateTime] = scheduleItem.querySelector('.card-body').textContent.split(' : ');
  const [branch, service] = branchService.split(' - ');
  const [date, time] = dateTime.split(' à ');

  branchSelect.value = branch.trim();
  updateServices();
  serviceSelect.value = service.trim();
  document.getElementById('date').value = date.trim();
  document.getElementById('time').value = time.trim();
  document.getElementById('scheduleId').value = scheduleId;
}

function deleteSchedule(scheduleId) {
  const scheduleItem = document.getElementById(scheduleId);
  scheduleList.removeChild(scheduleItem);
}

function publishSchedule(scheduleId) {
  const scheduleItem = document.getElementById(scheduleId);
  scheduleItem.querySelector('.card').classList.add('border-success');
  alert('Horaire publié avec succès!');
}

function resetForm() {
  document.getElementById('scheduleForm').reset();
  document.getElementById('scheduleId').value = '';
}

document.addEventListener('DOMContentLoaded', () => {
  updateServices();
});


