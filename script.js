$(document).ready(function() {
    carregarTarefas(); // Carrega as tarefas ao iniciar

    $('#formulario').on('submit', function(event) {
        event.preventDefault();
        var tarefa = $('#tarefa').val();
        adicionarTarefa(tarefa);
        $('#tarefa').val('');
        salvarTarefas(); // Salva as tarefas
    });

    $('#listaTarefas').on('click', 'li', function() {
        var $tarefa = $(this).children('span');
        $tarefa.toggleClass('riscar'); // Riscando apenas o texto

        // Move a tarefa riscada para o final da lista
        if ($tarefa.hasClass('riscar')) {
            $(this).appendTo('#listaTarefas'); // Mover para o final
        }
    });

    $('#listaTarefas').on('click', '.apagar', function(event) {
        event.stopPropagation(); // Impede que o evento de riscar seja acionado
        $(this).parent().remove(); // Remove a tarefa
        salvarTarefas(); // Salva as tarefas
    });
});

function adicionarTarefa(tarefa) {
    $('#listaTarefas').prepend('<li><span>' + tarefa + '</span> <button class="apagar">Apagar</button></li>');
}

function salvarTarefas() {
    var tarefas = [];
    $('#listaTarefas li').each(function() {
        tarefas.push($(this).children('span').text()); // Salva apenas o texto da tarefa
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Salva no localStorage
}

function carregarTarefas() {
    var tarefas = JSON.parse(localStorage.getItem('tarefas'));
    if (tarefas) {
        tarefas.forEach(function(tarefa) {
            adicionarTarefa(tarefa);
        });
    }
}
