const problems = [
    {
        title: "FizzBuzz",
        description: "¿Eres capaz de resolver el famoso problema de las entrevistas?",
        content: `<p>Llegas a la oficina dispuesto a ayudar a recuperar el orden. Está todo patas arriba, han desaparecido las sillas, la máquina del agua está volcada, y las luces parpadean de forma irregular. Vas donde están todos los de desarrollo, y Migue te entrega un papel. Es… ¿un examen? En él se lee:</p>
<h2>
    <strong>FizzBuzz</strong>
</h2>
<pre><code class="language-plaintext">Para saber si nos puedes ayudar a arreglar la oficina, implementa correctamente el programa FizzBuzz. Si no te sale, no pasa nada, en el comedor está el resto de tus compañeros. Puedes ir a tomarte un cafe.

Escribe un programa que devuelva en una cadena de texto los números de 1 a 100 (ambos incluidos y sin saltos de línea), sustituyendo los siguientes:
 - Múltiplos de 3 por la palabra "fizz".
 - Múltiplos de 5 por la palabra "buzz".
 - Múltiplos de 3 y de 5 a la vez por la palabra "fizzbuzz".
 
 Por ejemplo, para los 5 primeros numeros, seria: 
 <blockquote><i>12fizz4buzz</i></blockquote>
 </code></pre>
 
<p>
    No parece muy complicado…
</p>

        `,
        initial_code: `function main() {
        // start here
}`,
        test_cases: [
            {
                input: '',
                expected_output: '12fizz4buzzfizz78fizzbuzz11fizz1314fizzbuzz1617fizz19buzzfizz2223fizzbuzz26fizz2829fizzbuzz3132fizz34buzzfizz3738fizzbuzz41fizz4344fizzbuzz4647fizz49buzzfizz5253fizzbuzz56fizz5859fizzbuzz6162fizz64buzzfizz6768fizzbuzz71fizz7374fizzbuzz7677fizz79buzzfizz8283fizzbuzz86fizz8889fizzbuzz9192fizz94buzzfizz9798fizzbuzz',
                used_for_scoring: 0,
            },
            {
                input: '',
                expected_output: '12fizz4buzzfizz78fizzbuzz11fizz1314fizzbuzz1617fizz19buzzfizz2223fizzbuzz26fizz2829fizzbuzz3132fizz34buzzfizz3738fizzbuzz41fizz4344fizzbuzz4647fizz49buzzfizz5253fizzbuzz56fizz5859fizzbuzz6162fizz64buzzfizz6768fizzbuzz71fizz7374fizzbuzz7677fizz79buzzfizz8283fizzbuzz86fizz8889fizzbuzz9192fizz94buzzfizz9798fizzbuzz',
                used_for_scoring: 1,
            },
        ],
        active_time_window_start: new Date(2025, 10, 1).toISOString(),
        active_time_window_end: new Date(2025, 12, 1).toISOString(),
    },

    {
        title: "Sillas perdidas",
        description: "Ayuda al equipo a encontrar nuestras sillas",
        content: `<p>
    ¡Enhorabuena! Has logrado pasar la prueba. Todos te miran, orgullosos.&nbsp;
</p>
<p>
    La victoria, sin embargo, se difumina rápidamente, y ya te han encasquetado la primera de las tareas de recuperación de la oficina.&nbsp;
</p>
<p>
    Resulta que cuando cayó el caos, los otros departamentos nos robaron todas las sillas – las pocas que tenemos. Las hemos recuperado, pero ahora no sabemos cuáles pertenecen al equipo de desarrollo. Afortunadamente, todas tienen una etiqueta debajo con un número que las identifica, con una regla muy sencilla: todas aquellas sillas cuyo número identificativo sea una potencia de 2, son de desarrollo.&nbsp;
</p>
<p>
    Por ejemplo:&nbsp;<br>
    2, 4, 8, 16… son sillas de desarrollo. 5, 69, 420, no.
</p>
<p>
    <strong>Formato de entrada</strong><br>
    El input será un número, el identificador de la silla.<br>
    &nbsp;
</p>
<p>
    <strong>Formato de salida</strong><br>
    Se devolverá <i>1</i> si pertenece al equipo de desarrollo, y <i>0</i> si no.
</p>`,
        initial_code: `function main(n) {
        const identifier = Number(n);
        // start here
}`,
        test_cases: [
            {
                input: '1',
                expected_output: '1',
                used_for_scoring: 0,
            },
            {
                input: '16',
                expected_output: '1',
                used_for_scoring: 0,
            },
            {
                input: '3',
                expected_output: '0',
                used_for_scoring: 0,
            },
            {
                input: '-2',
                expected_output: '1',
                used_for_scoring: 0,
            },
            {
                input: '17179869184',
                expected_output: '1',
                used_for_scoring: 1,
            },
        ],
        active_time_window_start: new Date(2025, 10, 1).toISOString(),
        active_time_window_end: new Date(2025, 12, 1).toISOString(),
    },

    {
        title: "El teletrabajar se va a acabar",
        description: "Organiza los turnos de trabajo",
        content: `
        <p>
    Con las sillas organizadas, nos hemos dado cuenta de que aún no todas las sillas son comodas, así que se va a establecer un sistema de turnos para que todos tengamos posibilidad de sentarnos en las sillas buenas: Para una mesa de 6, habrá 6 trabajadores, que irán rotando a izquierdas en las mesas cada día.&nbsp;
</p>
<p>
    Se pide calcular, dado un orden inicial y un día específico, calcular el orden que habrá en ese día.
</p>
<p>
    Ejemplo
</p>
<pre><code class="language-plaintext">orden = [1,2,3,4,5,6]
dia = 2
orden_dia_2 = [3, 4, 5, 1, 2]</code></pre>
<p>
    <strong>Parámetros de entrada</strong>
</p>
<p>
    Una cadena de texto, en la que la primera posición será el número de días objetivo, y el resto, el orden inicial de la mesa.
    <blockquote> 2123456 </blockquote>
</p>
<p>
    <strong>Parámetros de salida</strong>
</p>
<p>
    Una cadena de texto con el nuevo orden de la mesa. Por ejemplo: 
    <blockquote> 345612 </blockquote>
</p>
        `,

        initial_code: `function main(input) {
        const [target_day, initial_order] = [Number(input.substring(0,1)), [...input.substring(1)].map(Number)]
        // start here
}`,
        test_cases: [
            {
                input: '2123456',
                expected_output: '345612',
                used_for_scoring: 0,
            },
            {
                input: '2123456',
                expected_output: '345612',
                used_for_scoring: 1,
            },
        ],
        active_time_window_start: new Date(2025, 10, 1).toISOString(),
        active_time_window_end: new Date(2025, 12, 1).toISOString(),
    },

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
    },
]

module.exports = problems;