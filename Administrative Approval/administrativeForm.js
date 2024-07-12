document.addEventListener('DOMContentLoaded', function () {
    const dialogueForm = document.getElementById('dialogueForm');
    const saveBtn = document.getElementById('saveBtn');
    const saveMessage = document.getElementById('saveMessage');

    if (dialogueForm) {
        // Function to generate a reference number
        function generateRefNo() {
            const prefix = 'UP/24-25/';
            const randomNum = Math.floor(10000 + Math.random() * 90000); // Generate a random 5-digit number
            return `${prefix}${randomNum}`;
        }

        // Function to set today's date in yyyy-mm-dd format
        function setTodayDate() {
            const today = new Date();
            const month = ('0' + (today.getMonth() + 1)).slice(-2); // Adding leading zero if single digit month
            const day = ('0' + today.getDate()).slice(-2); // Adding leading zero if single digit day
            return `${today.getFullYear()}-${month}-${day}`;
        }

        // Check if refNo is stored in sessionStorage
        const refNo = sessionStorage.getItem('refNo');
        if (refNo) {
            // If refNo exists, populate the input field
            document.getElementById('dialogue1').value = refNo;
        } else {
            // If refNo doesn't exist, generate new refNo and store in sessionStorage
            const newRefNo = generateRefNo();
            document.getElementById('dialogue1').value = newRefNo;
            sessionStorage.setItem('refNo', newRefNo);
        }

        // Set today's date in date input field
        document.getElementById('date').value = setTodayDate();

        dialogueForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission for dialogueForm
        });

        saveBtn.addEventListener('click', function () {
            // Retrieve refNo from sessionStorage
            const refNo = sessionStorage.getItem('refNo');

            if (!refNo) {
                alert('Session data not found. Please generate refNo.');
                return;
            }

            // Gather data from dialogue form
            const section = document.getElementById('dialogue2').value;
            const department = document.getElementById('dialogue3').value;
            const location = document.getElementById('dialogue4').value;
            const date = document.getElementById('date').value;
            const subject = document.getElementById('dialogue5').value;
            const background = document.getElementById('dialogue6').value;
            const proposal = document.getElementById('dialogue7').value;
            const budget = document.getElementById('dialogue8').value;
            const doa = document.querySelector('input[name="doa"]:checked').value;
            const authority = document.getElementById('dialogue9').value;
            const conclusion = document.getElementById('dialogue10').value;
            const confidential = document.querySelector('input[name="confidential"]:checked').value;

            // Use jsPDF library to generate PDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Set title and content
            doc.setFontSize(18);
            doc.text('ADMINISTRATIVE APPROVAL', 10, 20);

            let y = 30;

            function addSection(title, content) {
                doc.setFontSize(12);
                doc.text(title, 10, y);
                y += 6;
                doc.setFontSize(10);
                doc.text(content, 10, y);
                y += 10;
            }

            addSection('Ref No:', refNo);
            addSection('Section:', section);
            addSection('Department:', department);
            addSection('Location:', location);
            addSection('Date:', date);
            addSection('Subject:', subject);
            addSection('Background:', background);
            addSection('Proposal:', proposal);
            addSection('Budget & Financial Implication:', budget);
            addSection('DOA Applicable:', doa);
            addSection('Effective Authority:', authority);
            addSection('Conclusion:', conclusion);
            addSection('Confidential:', confidential);

            // Save PDF
            doc.save('administrative_approval.pdf');

            // Show save message
            saveMessage.classList.remove('hidden');
        });
    }
});
