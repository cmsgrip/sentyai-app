document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const wizardSteps = document.querySelectorAll('.wizard-step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const termsCheckbox = document.getElementById('terms-checkbox');
    const nextStep1Btn = document.getElementById('next-step-1-btn');
    const emailConfirmation = document.getElementById('email-confirmation');
    const finishBtn = document.getElementById('finish-btn');
    const setupWizard = document.getElementById('setup-wizard');
    const documentDashboard = document.getElementById('document-dashboard');
    const documentList = document.getElementById('document-list');
    const documentContentArea = document.getElementById('document-content-area');

    let currentStep = 1;
    const totalSteps = 10; // Total number of steps in the wizard
    let companyData = {};

    const updateWizard = () => {
        // Update progress bar
        const progress = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${progress}%`;

        // Show current step
        wizardSteps.forEach(step => {
            if (parseInt(step.id.split('-')[1]) === currentStep) {
                step.classList.remove('hidden');
                step.classList.add('active-step');
            } else {
                step.classList.add('hidden');
                step.classList.remove('active-step');
            }
        });
    };

    termsCheckbox.addEventListener('change', () => {
        nextStep1Btn.disabled = !termsCheckbox.checked;
    });

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                if (currentStep === 1) {
                    emailConfirmation.classList.remove('hidden');
                }
                currentStep++;
                updateWizard();
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateWizard();
            }
        });
    });

    finishBtn.addEventListener('click', () => {
        // Collect data from the form
        companyData = {
            yourName: document.getElementById('your-name').value,
            yourEmail: document.getElementById('your-email').value,
            companyName: document.querySelector('#step-1 input[type="text"]').value, // A more specific selector
            // ... collect all other data from the form ...
        };

        setupWizard.classList.add('hidden');
        documentDashboard.classList.remove('hidden');
        populateDocumentList();
    });

    const populateDocumentList = () => {
        const documents = {
            'Legal': [
                { name: 'Privacy Policy', id: 'privacy-policy' },
                { name: 'Terms of Service', id: 'terms-of-service' },
            ],
            'Human Resources': [
                { name: 'Employee Handbook', id: 'employee-handbook' },
                { name: 'Recruitment Policy', id: 'recruitment-policy' },
            ],
        };

        documentList.innerHTML = ''; // Clear the list before populating
        for (const category in documents) {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('mb-4');
            const categoryTitle = document.createElement('h3');
            categoryTitle.classList.add('font-semibold', 'text-gray-700', 'mb-2');
            categoryTitle.textContent = category;
            categoryDiv.appendChild(categoryTitle);

            const documentLinks = document.createElement('div');
            documentLinks.classList.add('pl-4');
            documents[category].forEach(doc => {
                const docLink = document.createElement('a');
                docLink.href = '#';
                docLink.classList.add('block', 'py-1', 'text-gray-600', 'hover:text-indigo-600');
                docLink.textContent = doc.name;
                docLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    displayDocumentContent(doc.name, companyData);
                });
                documentLinks.appendChild(docLink);
            });

            categoryDiv.appendChild(documentLinks);
            documentList.appendChild(categoryDiv);
        }
    };

    const displayDocumentContent = (documentName, data) => {
        let content = '';
        switch (documentName) {
            case 'Privacy Policy':
                content = `
                    <h2 class="text-2xl font-bold text-gray-800">Privacy Policy</h2>
                    <p class="mt-4 text-gray-600">This Privacy Policy describes how ${data.companyName || 'your company'} collects, uses, and shares your personal information when you use our services.</p>
                    <p class="mt-4 text-gray-600">This document was prepared for ${data.companyName || 'your company'} by SentyAI.</p>
                `;
                break;
            case 'Terms of Service':
                content = `
                    <h2 class="text-2xl font-bold text-gray-800">Terms of Service</h2>
                    <p class="mt-4 text-gray-600">These Terms of Service govern your use of the services provided by ${data.companyName || 'your company'}.</p>
                    <p class="mt-4 text-gray-600">This document was prepared for ${data.companyName || 'your company'} by SentyAI.</p>
                `;
                break;
            default:
                content = `
                    <h2 class="text-2xl font-bold text-gray-800">${documentName}</h2>
                    <p class="mt-4 text-gray-600">This is the simulated content for the ${documentName}. The actual AI-generated content will appear here.</p>
                `;
        }
        documentContentArea.innerHTML = content;
    };

    // Initial setup
    updateWizard();
});