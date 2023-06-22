const re = /`([A-Za-z0-9_-]*)`/g;

let vars = [];
let curVar = null;
let stringBuilder = "";

document.getElementById("value").onkeydown = (ev) => {
    const charCode = ev.keyCode || ev.which;
    if (charCode === 13) {
        ev.preventDefault();
        InsertVal();
    }
};

document.getElementById("template").oninput = UpdateVars;

document.getElementById("submit").onclick = InsertVal;

function InsertVal() {
    stringBuilder = stringBuilder.replaceAll("`" + vars[curVar] + "`", document.getElementById("value").value);
    if (curVar < vars.length - 1) {
        curVar++;
    } else {
        document.getElementById("output").value = document.getElementById("output").value + stringBuilder;
        curVar = 0;
        stringBuilder = document.getElementById("template").value;
    }
    document.getElementById("variables").value = vars[curVar];
    document.getElementById("value").value = "";
}

function UpdateVars() {
    document.getElementById("variables").innerHTML = "";
    vars = [];
    curVar = null;
    stringBuilder = "";

    if (document.getElementById("template").value.match(re)) {
        document.getElementById("template").value.match(re).forEach(function (varName) {
            varName = varName.substring(1, varName.length - 1);
            if (varName.trim().length > 0 && !vars.includes(varName)) vars.push(varName);
        });
        vars.forEach(function (varName) {
            let tmp = document.createElement("option");
            tmp.value = varName;
            tmp.innerText = varName;
            document.getElementById("variables").appendChild(tmp);
        });
    }

    if (vars.length === 0) {
        let tmp = document.createElement("option");
        tmp.value = "";
        tmp.innerText = "Use ` to surround your vars in template text - e.g. `var_name`";
        document.getElementById("variables").appendChild(tmp);
    } else {
        curVar = 0;
        document.getElementById("variables").value = vars[0] ? vars[0] : "";
        stringBuilder = document.getElementById("template").value;
    }

    document.getElementById("variables").setAttribute("size", Math.max(vars.length + 1, 2).toString());
}