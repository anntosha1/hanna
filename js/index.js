// Copiright sign and skills list
const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector('footer');
const copiright = document.createElement('p');
const skills = ["Basic JavaScript", "HTML", "CSS", "SASS", "LESS", "Git", "GItHub", "VS Code", "GitHub Descktop", "BEM"];
const skillsSection = document.getElementById('skills');
const skillslist = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement('li');
    skill.innerHTML = skills[i];
    skillslist.appendChild(skill);
};

copiright.innerHTML = `Hanna Val ${thisYear}`;
copiright.className = "copiright";
footer.appendChild(copiright);

//Message form
const messageForm = document.getElementsByName('leave_message')[0];
const messageSection = document.getElementById('messages');
messageSection.style.display = 'none';

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Geting form values
    const inputElements = document.querySelectorAll('input, textarea');
    const nameField = inputElements[0].value;
    const emailField = inputElements[1].value;
    const messageField = inputElements[2].value;
    console.log(nameField, emailField, messageField);

    //Making messages
    const messageList = messageSection.querySelector('ul');
    const newMessage = document.createElement('li');
    const linkMessage = document.createElement('a');
    const spanMessage = document.createElement('span');
    linkMessage.textContent = nameField;
    linkMessage.style.fontWeight = 'bold';
    linkMessage.style.color = '#9B59B6';
    linkMessage.href = `mailto:${emailField}`;
    spanMessage.textContent = ` ${messageField} `;
    spanMessage.className = 'spanMessage';
    
    newMessage.appendChild(linkMessage);
    newMessage.appendChild(spanMessage);
    
    //Creating remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    removeButton.style.backgroundColor = '#F1948A';
    removeButton.type = 'button';
    removeButton.addEventListener('click', () => {
        const entry = removeButton.parentNode.parentNode;
        entry.removeChild(newMessage);

    //Message section reset if removing all the messages
        if (messageList.children.length < 1) {
            messageSection.style.display = 'none';
        }
    });

    //Creating edit and save button in one
    const editButton = document.createElement('button');
    editButton.textContent = 'edit';
    editButton.type = 'button';
    newMessage.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const button = e.target;
            if (button.textContent === 'edit') {
                const input = document.createElement('input');
                const span = newMessage.children[1];
                input.type = 'text';
                input.value = span.textContent;
                newMessage.insertBefore(input, span);
                newMessage.removeChild(span);
                button.textContent = 'save';
            } else if (button.textContent === 'save') {
                const input = newMessage.children[1];
                const span = document.createElement('span');
                span.textContent = input.value;
                span.className = 'savedSpan';
                newMessage.insertBefore(span, input);
                newMessage.removeChild(input);
                button.textContent = 'edit';
            }
        }
    });
  
    messageList.appendChild(newMessage); 
    newMessage.appendChild(editButton);
    newMessage.appendChild(removeButton);
    
    //Display message section if someone live message
    if (messageList.children.length > 0) {
        messageSection.style.display = 'block';
    }

    messageForm.reset();
});

//Fetch GitHub Repositories with Fetch API
(function () {
    let repositories;
    fetch('https://api.github.com/users/anntosha/repos')
            .then(response => response.json())
            .then(data => {repositories = data})
            .then(addEventListener('load', function() {
                const projectSection = document.getElementById('projects');
                const projectList = projectSection.getElementsByTagName('ul')[0];
                if (repositories == null) {
                    const reloadMessage = document.createElement('p');
                    reloadMessage.className = 'reload';
                    reloadMessage.textContent = 'GitHub is not responding please reload the page';
                    projectSection.appendChild(reloadMessage);
                } else {
                    for (let i = 0; i < repositories.length; i++) {
                        let project = document.createElement('li');
                        let progectLink = document.createElement('a');
                        let projectDescription = document.createElement('p');
                        project.className = 'project';
                
                        progectLink.textContent = repositories[i].name;
                        projectDescription.textContent = ` Description: ${repositories[i].description}, Owner: ${repositories[i].owner.login}`;
                        progectLink.href = repositories[i].html_url;
                
                        project.appendChild(progectLink);
                        project.appendChild(projectDescription);
                        projectList.appendChild(project);
                    } 
                }   
            }))
            .catch(error => console.log('Looks like there was a problem', error));
 })();

//Fetch GitHub Repositories by XMLHttpRequest:
/*const githubRequest = new XMLHttpRequest();
githubRequest.onreadystatechange = function () {
    if(githubRequest.readyState === 4 && githubRequest.status === 200) { 
  }
}
githubRequest.open('GET', 'https://api.github.com/users/anntosha/repos');
githubRequest.send();
githubRequest.addEventListener('load', function() {
    console.log(this.response);
    const repositories = JSON.parse(this.response);
    console.log(repositories);
    const projectSection = document.getElementById('projects');
    const projectList = projectSection.getElementsByTagName('ul')[0];
    for (let i = 0; i < repositories.length; i++) {
        let project = document.createElement('li');
        let progectLink = document.createElement('a');
        let projectDescription = document.createElement('p');
        project.className = 'project';

        progectLink.textContent = repositories[i].name;
        projectDescription.textContent = ` Description: ${repositories[i].description}, Owner: ${repositories[i].owner.login}`;
        progectLink.href = repositories[i].html_url;

        project.appendChild(progectLink);
        project.appendChild(projectDescription);
        projectList.appendChild(project);
    }
});
*/

