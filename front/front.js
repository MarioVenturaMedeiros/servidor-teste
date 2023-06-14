function CriaUsuario() {
    var nome = $("#nome").val();
    var id = parseInt($("#id").val());
    var senha = $("#senha").val();
    var login = $("#login").val();

    var json = {
        "id": id,
        "nome": nome,
        "login": login,
        "senha": senha,
    }
    $.post("/novocadastro", json, function (resultado) {
        if (resultado == "Cadastro realizado com sucesso") {
            window.location.href = "/bemvindo.html";
        }
    })
}

function Login() {
    var senha = $("#senha").val();
    var login = $("#login").val();

    var json = {
        "login": login,
        "senha": senha,
    }

    $.post("/verifica", json, function(resultado){
        if (resultado == "Usuário logado com sucesso"){
            window.location.href = "/bemvindo.html"
        }
    })
}

function SemCadastro(){
    window.location.href = "/cadastro.html"
}