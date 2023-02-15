const output_register = document.querySelector("#output_register");
const authors = document.querySelector("#authors");

const Loader = {
    id: "confetti-example",
    name: "Confetti Example",
    description: "This is an example description!",
    version: [1, 0, 0],
    supported_minecraft: [1, 17, 0, 1, 19, 3],
    authors: [],
}

function onInput() {
    Loader.authors = [];
    authors.querySelectorAll("input").forEach(input => {
        if (input.value) {
            Loader.authors.push(`'"${input.value}"'`)
        }
    });
    output_register.innerHTML = `
    data modify storage confetti Loader append value {Id: "${Loader.id}", Name: '${Loader.name}', Description: '${Loader.description}', Version: [B; ${Loader.version[0]}b, ${Loader.version[1]}b, ${Loader.version[2]}b], Authors: [${Loader.authors.join(', ')}], Minecraft: {From: [${Loader.supported_minecraft[0]}, ${Loader.supported_minecraft[1]}, ${Loader.supported_minecraft[2]}], To: [${Loader.supported_minecraft[3]}, ${Loader.supported_minecraft[4]}, ${Loader.supported_minecraft[5]}]}, Dependencies: [], GameRules: [], Permissions: []}
    `;
}

const LimitField = {
    versionInput(field, _event) {
        const matches = field.value.match(/(\d+)/);
        field.value = matches ? matches[0].slice(0, 2) : "";
        return matches ? Number(matches[0].slice(0, 2)) : Number(field.placeholder);
    },
    idInput(field, _event) {
        field.value = field.value?.replaceAll(" ", "-")?.replaceAll("--", "-")?.toLowerCase();
        const matches = field.value.match(/([a-z]+|-|_)/g);
        field.value = matches ? matches.join("") : "";
        Loader.id = field.value;
        onInput();
    },
};

function appendArrayItem(button, name) {
    const input = button.parentElement.insertBefore(document.createElement("input"), button);
    input.oninput = function (_) {
        onInput();
    }
    input.placeholder = "Name"

    const rm = button.parentElement.insertBefore(document.createElement("button"), button);
    rm.classList.add("button");
    rm.classList.add("removeButton");
    rm.innerHTML = `<i class="fa-solid fa-minus"></i>`
    rm.onclick = function (_) {
        input.remove();
        rm.remove();
        onInput();
    }
}
