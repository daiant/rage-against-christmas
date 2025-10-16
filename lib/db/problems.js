const problems = [
    {
        title: "Caos en el comedor",
        description: "La gente tiene sueño, y ganas de tomarse un cafe.",
        content: `<p>Son las nueve de la mañana y la gente esta esperando en la cola de las maquinas de cafe del corporativo. Resulta que Vicente ha dicho que hoy habia kata, asi que parece que va para largo.</p>
        <p>Antes de ponerse a la fila, el segurata del cafe le ha dado un turno a cada uno, marcando su posicion inicial en la fila, desde <strong>1</strong> hasta <strong>n</strong>.</p>
        <p>Los mas espabilados estan empezando a sobornar al resto para colarse en la fila, desbaratando el orden por completo. Sin embargo, el segurata es bastante perezoso, y dejara que la cola continue siempre y cuando la gente no soborne a mas de dos personas cada uno.</p>
        <p>Determina el minimo numero de sobornos que hubo en una cola dado un orden final. Devuelve el numero de sobornos o, si alguien ha sobornado a mas de dos personas, devuelve -1.</p>
        <p><strong>Ejemplo</strong></p>
        <i>q = [1,2,3,5,4,6,7,8]</i>
        <p>Si la persona <strong>5</strong> soborna a la persona <strong>4</strong> cuando estan ordenados, la cola quedaria: <i>1,2,3,5,4,6,7,8</i>. Solo se ha necesitado sobornar a una persona, se devuelve <strong>1</strong>.</p>
        <i>q = [4,1,2,3]</i>
        <p>La persona <strong>4</strong> ha tenido que sobornar a <strong>3</strong> personas para llegar a la posicion actual. Devuelve <strong>-1</strong>.</p>
        <p><strong>Formato de entrada</strong></p>
        <p>El parametro sera un listado de numeros separados por espacios, que corresponderan al orden de la fila tras todos los sobornos.</p>
        
        <p><strong>Formato de salida</strong></p>
        <p>Se devuelve un numero correspondiendo al minimo total de los sobornos que han tenido lugar, o -1 en caso de que alguien haya sobornado a mas de 2 personas.</p>
        `,
        initial_code: `function main(input) {
        // ignore this line
        input = input.replace(/\\s+$/g, '').split(' ').map(qTemp => parseInt(qTemp, 10));
        
        // start here
}`,
        test_cases: [
            {
                input: '2 1 5 3 4',
                expected_output: '3',
                used_for_scoring: 0,
            },
            {
                input: '2 5 1 3 4',
                expected_output: '-1',
                used_for_scoring: 0,
            },
            {
                input: '2 1 5 3 4 ' + new Array(15_000_000).fill(1).map((_, i) => i + 6).join(' '),
                expected_output: '3',
                used_for_scoring: 1,
            }
        ],
        active_time_window_start: new Date(2025, 10, 1).toISOString(),
        active_time_window_end: new Date(2025, 12, 1).toISOString(),
    }
]

module.exports = problems;