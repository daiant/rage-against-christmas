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
        title: "Ciberseguridad 101",
        description: "Regla numero uno, no dejes al becario gestionar las contraseñas.",
        content: `<p>
    Organizando la sala de los servidores, el becario se ha confundido y ha mezclado la caja de las contraseñas de los empleados con la caja de contraseñas señuelo que usamos para que no nos hackeen. ¡Ahora ya no sabemos como entrar al Jira para imputar las horas! Te han encomendado la titánica tarea de filtrar las contraseñas señuelo de las reales. Tras horas de mirar letras, números y palabras raras, hay algo que empieza a hacer click dentro de ti: ¡los señuelos son una especie de palíndromos! Concretamente, si solo te quedas con las letras de una contraseña, y lo que se queda es un palíndromo, es un señuelo.
</p>
<p>
    Los palíndromos tampoco distinguen las mayúsculas o minúsculas
</p>
<p>
    &nbsp;
</p>
<p>
    Por ejemplo:&nbsp;
</p>
<pre><code class="language-plaintext">q = A1b2B!a
se convierte en "abba", que es un palíndromo, pues es igual del derecho que del revés</code></pre>
<p>
    &nbsp;
</p>
<p>
    Se pide que, teniendo una lista de contraseñas, devuelvas únicamente las que son señuelos
</p>
<p>
    &nbsp;
</p>
<p>
    <strong>Formato de entrada</strong>
</p>
<p>
    Una cadena de texto conteniendo las contraseñas, válidas y señuelos, separadas por espacios.
</p>
<p>
    &nbsp;
</p>
<p>
    <strong>Formato de salida</strong>
</p>
<p>
    Una cadena de texto con las contraseñas señuelo, separadas por espacios también.
</p>`,
        initial_code: `function main(input) {
        // start here
}`,
        test_cases: [
            {
                input: '2 1 5 3 4',
                expected_output: '3',
                used_for_scoring: 0,
            },
        ],
        active_time_window_start: new Date(2025, 10, 1).toISOString(),
        active_time_window_end: new Date(2025, 12, 1).toISOString(),
    },
    {
        title: "Super Almuerzo",
        description: "Siempre es el cumple de alguien, y nunca me toca nada :(",
        content: `<p>
    A modo de agradecimiento por todo el trabajo que está suponiendo llevar esta empresa a flote, los jefes nos han traído bollería fresca de la gasolinera de al lado.&nbsp;
</p>
<p>
    Sin embargo, no han contado con que todos estaríamos trabajando en la oficina, y no hay para todos por igual. Te han pedido que montes un programa para repartir la comida. Tú, que la verdad no sabes mucho de justicia, pero sí de algoritmos, has pensado que lo mejor sería hacerlo de forma aleatoria, basándote en el número de empleado de cada uno. Para ello, calculando el superdígito de cada empleado, esos serán los bollos que se podrá comer.&nbsp;
</p>
<p>
    Un superdígito es aquel que, sumando todos los dígitos del número original, se convierte en uno solo.&nbsp;
</p>
<p>
    Por ejemplo:
</p>
<pre><code class="language-plaintext">9875 -&gt; 9 + 8 + 7 + 5 =&gt; 29 -&gt; 2 + 9 =&gt; 11 -&gt; 1 + 1 =&gt; 2
Por tanto, el superdígito de 9875 es 2</code></pre>
<p>
    Se pide que, dado un número, calcules el número de cruasanes que se puede comer.
</p>
<p>
    &nbsp;
</p>
<p>
    <strong>Formato de entrada</strong>
</p>
<p>
    Un número, menor de 2<sup>52</sup>
</p>
<p>
    &nbsp;
</p>
<p>
    <strong>Formato de salida</strong>
</p>
<p>
    Un número 1 ≤ x ≤ 10
</p>`,
        initial_code: `function main(input) {
        // start here
}`,
        test_cases: [
            {
                input: '21534',
                expected_output: '3',
                used_for_scoring: 0,
            },
        ],
        active_time_window_start: new Date(2025, 10, 1).toISOString(),
        active_time_window_end: new Date(2025, 12, 1).toISOString(),
    },
    {
        title: "Sillas perdidas II",
        description: "Hay veces que los problemas parecen iguales, pero la solucion nunca lo es.",
        content: `<p>
    Al subir del almuerzo, notas una tensión rara en el aire: desarrollo está sentadito en su sitio, trabajando haciendo lo que sea que hacen los programadores, mientras que la gente de SAP y sistemas están de pie, todos mezclados y mirando confusamente las sillas. No sabes muy bien qué hacen ellos tampoco, pero podrías jurar que eso no forma parte de su trabajo. Confundido tú también, te acercas a ver qué es lo que puede estar pasando.&nbsp;
</p>
<p>
    Resulta que las sillas que organizaste el otro día entre SAP y desarrollo no eran solo de SAP, ¡sino también de sistemas! &nbsp;Menos mal que los de sistemas también tenían identificadores para las sillas, pero esta vez, en vez de ser potencias de 2, los identificadores son potencias de 3: 1, 3, 9, 27…
</p>
<p>
    &nbsp;
</p>
<p>
    <strong>Formato de entrada</strong><br>
    El input será un número, el identificador de la silla.<br>
    &nbsp;
</p>
<p>
    <strong>Formato de salida</strong><br>
    Se devolverá 1 si pertenece al equipo de sistemas, y 0 si no.
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
    {
        title: "Popular entre los empleados",
        description: "",
        content: `<p>
    Descubrir el misterio de los sobornos está muy bien y eso, pero una vez sobornadas a las dos personas correspondientes, la máquina del café sigue estando a kilómetros de ti. Con la boca seca, los ojos aún pegajosos de las legañas, intentas pasar el rato inventándote problemas de programación, como hace la gente completamente normal.
</p>
<p>
    Considera a la gente que tienes delante en las cuatro filas del café (estamos en el corporativo) como si fuera una red de celdas, en las que el valor de la celda será <strong>0</strong> si no los conoces, o <strong>1 </strong>si por lo menos te suena su cara. Dos celdas (personas) estarán conectadas si son adyacentes entre sí, ya sea horizontal, vertical, o diagonalmente. Por ejemplo, en la siguiente red, las celdas <strong>X </strong>están conectadas a la celda <strong>Y.</strong>
</p>
<pre><code class="language-plaintext">XXX
XYX
XXX</code></pre>
<p>
    Si una o más celdas con valor <strong>1</strong> están conectadas, forman una región. Ojo, porque cada celda de una región está conectada a 0 o 1 otra celda de la región, pero no necesariamente todas las celdas están conectadas entre sí.&nbsp;
</p>
<p>
    Dada una matrix <i>n x m</i>, encuentra y devuelve el número de celdas en la región más grand de la matriz. Es posible que haya más de una región por cada matriz.&nbsp;
</p>
<p>
    Por ejemplo, en la siguiente matriz <i>3 x 3</i> hay dos regiones. &nbsp;La región en la esquina superior izquierda consiente <strong>3 celdas.</strong> La más pequeña, de abajo a la derecha contiene solamente <strong>1 celda.</strong>
</p>
<pre><code class="language-plaintext">110
100
001</code></pre>
<p>
    Se pide que, dada una matriz, se devuelva el número de celdas que contiene la región más grande.
</p>
<p>
    &nbsp;
</p>
<p>
    <strong>Formato de entrada</strong>
</p>
<p>
    Se recibe una lista de números separados por espacios. Los grupos de números sin espacios constituyen las filas de la matriz. Por ejemplo
</p>
<blockquote>
    <p>
        110 100 001
    </p>
</blockquote>
<p>
    &nbsp;
</p>
<p>
    <strong>Formato de salida</strong>
</p>
<p>
    Un número, determinando el número de celdas conectadas en la mayor región de la matriz
</p>
<blockquote>
    <p>
        3
    </p>
</blockquote>
<p>
    &nbsp;
</p>`,
        initial_code: `function main(input) {
        // start here
}`,
        test_cases: [
            {
                input: '110 100 001',
                expected_output: '3',
                used_for_scoring: 0,
            },
        ],
        active_time_window_start: new Date(2025, 10, 1).toISOString(),
        active_time_window_end: new Date(2025, 12, 1).toISOString(),
    }
]

module.exports = problems;