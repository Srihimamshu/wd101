let userForm = document.getElementById("user-form");


const retrievedEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

let userEntries = retrievedEntries();

const displayEntries = () => {
    const entries = retrievedEntries();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptedTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndConditions ? 'Yes' : 'No'}</td>`;

        const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptedTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class="table-auto w-full"> 
    <div id="user-entries" class="text-center">
    <h1 class="mb-4"><b>USER ENTRIES</b></h1>
    </div>
        <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Password</th>
            <th class="px-4 py-2">DOB</th>
            <th class="px-4 py-2">Accepted Terms?</th>
        </tr>${tableEntries}
    </table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dobInput = document.getElementById("dob");
    const acceptedTermsAndConditions = document.getElementById("terms").checked;

    
    const dob = dobInput.value;
    const userDob = new Date(dob);
    const today = new Date();
    const minDob = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const maxDob = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    if (userDob < minDob || userDob > maxDob) {
        alert("Please enter a valid date of birth between ages 18 and 55.");
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndConditions
    }

    userEntries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
}

userForm.addEventListener("submit", saveUserForm);
displayEntries();
