const articles = [
    {
        content: `<p>
    ¡Ey! Bienvenido a&nbsp;<strong>Rage Against Christmas.</strong> A estas alturas ya deberías saber de qué va esto, pero si no, yo te lo explico.&nbsp;
</p>
<p>
    Rage Against Christmas es una versión destilada del típico calendario de Adviento de programación, con problemas que van desde principiante hasta un poquito más avanzado. Va a haber una pequeña competición por ver cuál es el código más rápido en cada problema, por lo que las soluciones se tienen que basar un poco en el rendimiento.&nbsp;
</p>
<p>
    En total va a haber 8 problemas, que se van a ir desbloqueando conforme pasen los días. Te recomiendo que no se te acumulen los problemas, porque son bastante rapiditos de hacer la mayoría, y tenemos muchas cosas que hacer en la vida real y eso.
</p>
<p>
    Más allá de los problemas, también voy a ir publicando consejos, referencias externas y alguna que otra cosa más, así que estate atento a esta página (también lo voy a decir en la oficina lo más seguro).
</p>
<p>
Breves consideraciones a tener en cuenta a la hora de resolver este reto:
</p>
<ul>
    <li>Ten mucho cuidado con el parseo de strings y de números. En principio, todo va a venir como si fuera texto, y para hacer bucles, comparaciones con números, etc. es necesario convertirlo a tipo Number primero. Si surgen bucles infinitos o no funciona el código cuando sí que debería, acuérdate de esto.</li>
    <li>Para que un problema se considere resuelto, tiene que ejecutarse el caso de prueba final en menos de 10 segundos. Ese caso de prueba se ejecuta en el servidor que tengo montao, de 1 CPU y 2 GB de ram, asi que ya puede ser eficiente. Sin embargo, si ves que hay algún código que debería ser más rápido de lo que dice la máquina, coméntamelo a ver si es un fallo.</li>
    <li>Para conseguir la segunda estrella en el problema, hay que llevar el código al límite, o descubrir la solución óptima. Todos podéis conseguir la segunda estrella de un problema, no es el primero en conseguirla, ni el más rápido, sino quien entre dentro de un rango de tiempo de ejecución.</li>
    <li>El uso sin sentido de modelos de IA generativa está terminantemente prohibido. Si veo algún código que tiene mucha pinta de ser generado por IA, lo descalificaré. Usen la IA con cabeza, pa aprender y no pa que haga vuestro trabajo.</li>
    <li>Si, por lo que sea, encontrarais o ya conocéis la respuesta a alguno de los problemas, absteneos de comentarla con el equipo; dad pistas si queréis, pero no privéis a vuestros compañeros de lograrlo por sí mismos.</li>
</ul>
<p>
    Mañana saldrá el primer problema, ¡mucha suerte!
</p>`,
        active_time_window_start: new Date(2025, 10, 11, 7).toISOString(),
    },
    {
        content: `<p>
    ¿Sabías que FizzBuzz fue un juego inventado para que los niños aprendieran a dividir? Y luego, se usó para las entrevistas de trabajo de programadores. Ahí lo dejo.&nbsp;
</p>
<p>
    Generalmente, los problemas de programación, ya sea de algoritmos, estructura de datos, etc. son bastante utilizados en las entrevistas de trabajo. No en todas, como Power Electronics puede atestiguar. Sin embargo, nunca viene mal centrarse de vez en cuando en resolver problemas muy concretos con soluciones muy masticadas. Para ello, existen portales como el famoso LeetCode, o HackerRank, que es de donde vienen casi todas las pruebas de este Adviento. Si te aburres, ya sabes, puedes practicar ahí.
</p>
<p>
    &nbsp;
</p>
<p>
    En cuanto al problema actual, no hay mucho margen de mejora en el tiempo de ejecución, así que no te centres en el rendimiento, por ahora.
</p>
<p>
    ¡El 17 de noviembre se viene nuevo problema!
</p>`,
        active_time_window_start: new Date(2025, 10, 12, 7).toISOString(),
    },
    {
        content: `<p>
    ¿Qué tal, ya has descubierto como resolver el problema sin hacer bucles o usar recursividad?
</p>
<p>
    Si no lo sabías ya, te lo digo yo, las potencias de 2 son representaciones de conjuntos de bits.&nbsp;
</p>
<p>
    No porque trabajemos con javascript tenemos que olvidar cómo manipular bits, acceder a registros de memoria, y entrar un poco al bajo nivel de los ordenadores, que tanta abstracción nos está haciendo el cerebro pasa.&nbsp;
</p>
<p>
    En algunos proyectos ya estamos utilizando objetos de bajo nivel, como <a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array">Uint8Array</a>, que son representaciones de bytes, aunque aún queda mucho por descubrir, como <a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND">comparación de bits</a> o <a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Left_shift">bit shifting</a>.
</p>
<p>
    btw, ¡mañana se viene otro problema!
</p>`, active_time_window_start: new Date(2025, 10, 18, 7).toISOString(),
    },
    {
        content: `<p>
    Sin ningún lugar a dudas, los Arrays son la estructura de datos más utilizada en el ecosistema javascript, pero ¿nunca te has planteado si puede haber algo más allá? Voces de un recuerdo lejano aún llegan a tu pensamiento: Hashmaps, linked lists… (si ninguno te suena, casi mejor, ya tienes tarea pa este finde).
</p>
<p>
    Aunque puede no ser la manera más rápida de resolver este problema, te reto a que intentes implementar una versión sencilla de <a target="_blank" rel="noopener noreferrer" href="https://www.freecodecamp.org/news/implementing-a-linked-list-in-javascript/">LinkedLists</a>, simplemente por ver cómo puede ser. Ya me cuentas :)
</p>
<p>
    &nbsp;
</p>
<p>
    Lunes 24 de noviembre, ¡nuevo problema!
</p>`,
        active_time_window_start: new Date(2025, 10, 20, 7).toISOString(),
    },
    {
        content: `<p>
    Funfactos de nuestro amado lenguaje de programación
</p>
<p>
    ¿Sabías del concepto de la <a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring">desestructuración</a>? Eso que haces <code>[...cosa]</code> y se pone en un Array. Está guay pensar por qué funciona tanto para listas, para objetos, y para cadenas de texto por igual. Quizá porque (<a target="_blank" rel="noopener noreferrer" href="https://stackoverflow.com/questions/9108925/how-is-almost-everything-in-javascript-an-object/9110389#9110389">casi</a>) todo en javascript es un objeto, incluso un <i>String, </i>que no <i>string</i>, que es un primitivo<i>.</i>
</p>
<p>
    &nbsp;
</p>
<p>
    Otra, otra. ¿Conoces la función de split, en una cadena de texto? ¿Sabías que le puedes meter expresiones regulares? ¿Y prácticamente a todos los métodos de cadenas de texto también? Es muy interesante y te quita muchos dolores de cabeza, además de ponerte otros. Si no lo has hecho ya en el problema de los palíndromos, podrías intentarlo.
</p>`,
        active_time_window_start: new Date(2025, 10, 25, 7).toISOString(),
    },
    {
        // language=HTML
        content: `<p>
            Pocas veces nos da para trabajar con la recursividad en nuestros proyectos, pero cuando podemos, ¡qué
            maravilla! Me encanta arriesgarme a tener un bucle infinito a cambio de poder tener una mejora de O(log n)
            en la búsqueda de menús pendientes de pago cada noche.
        </p>
        <p>
            ¿Sabías que da tantos problemas que la NASA tiene prohibida la recursividad en su código? Lo tienes escrito,
            junto con 9 reglas más, <a target="_blank" rel="noopener noreferrer"
                                       href="https://spinroot.com/p10/">aquí</a>.
        </p>
        <p>
            A ver cuántas de esas reglas entiendes, high level programmer.
        </p>
        <p>
            ¿Qué tal hasta ahora el Adviento? Espero que no te estés ofuscando demasiado. Recuerda que pedir ayuda
            <strong>a un humano</strong> es lo mejor que puedes hacer para mejorar.
        </p>
        <p>Lunes que viene, otro problema. A partir de ahora, solamente habrá un problema por semana, que empiezan a
            venir las vacaciones, y los sprints.</p>`,
        active_time_window_start: new Date(2025, 10, 27, 7).toISOString(),
    },
    {
        content: `<p>
    ¡Ey! ¿Ya lo has resuelto? ¿Sin usar bucles?
</p>
<p>
    Muchas veces la programación es mucha matemática y poca estructura de datos. Y muchas veces dos problemas se pueden parecer, pero son completamente diferentes.
</p>
<p>Recuerda que el lunes que viene es festivo. Martes, nuevo problema.</p>`,
        active_time_window_start: new Date(2025, 11, 2, 7).toISOString(),
    },
    {
        content: `<p>
    ¿Cuántos tipos de sort conoces? ¿Has implementado alguno tú solo? ¿Conoces el <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Bogosort">bogosort</a>?
</p>
<p>
    Por cierto, muchas veces, para lograr el mayor rendimiento, tenemos que saltarnos un poco las normas y no ignorar lo que nos dicen que ignoremos.&nbsp;
</p>
<p>
    &nbsp;
</p>
<p>
    ¡Recta final! Ya solo queda un problema para acabar este reto. Ojo, porque será relativamente más complicado que el resto. Tómate tu tiempo y no te agobies. Dime qué te ha parecido si me encuentras por la oficina, me haría mucha ilusión.&nbsp;
</p>
<p>
    El último día para participar es el 22, así que ¡no te duermas!
</p>
<p>
    &nbsp;
</p>`,
        active_time_window_start: new Date(2025, 10, 10, 7).toISOString(),
    },
    {
        content: `<p>
    ¡Crisis solucionada! La oficina retomará la normalidad después de las vacaciones de Navidad, y todo gracias a ti.
</p>
<p>
    &nbsp;
</p>
<p>
    Muchas gracias por participar en este reto. Espero que te haya servido un mínimo para aprender y descubrir cosas nuevas.&nbsp;
</p>
<p>
    Ahora me toca a mí estudiar los códigos que habéis publicado a ver qué cosas me encuentro.
</p>
<p>
    En cuanto lo valide todo, anunciaré a la persona ganadora, y también el premio que se llevará, si no lo he anunciado antes.&nbsp;
</p>
<p>
    &nbsp;
</p>
<p>
    Bon Nadal!
</p>`
        , active_time_window_start: new Date(2025, 10, 22, 7).toISOString(),
    }
];

module.exports = articles;