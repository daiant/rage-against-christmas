const problems = [
    {
        title: "FizzBuzz",
        description: "¿Eres capaz de resolver el famoso problema de las entrevistas?",
        content: `<p>Llegas a la oficina, dispuesto a ayudar a recuperar el orden. Está todo patas arriba, han desaparecido las sillas, la máquina del agua está volcada, y las luces parpadean de forma irregular. Vas donde están todos los de desarrollo, y Migue te entrega un papel. Es… ¿Un examen? En él se lee:</p>
<h2>
    <strong>FizzBuzz</strong>
</h2>
<pre><code class="language-plaintext">Para saber si nos puedes ayudar a arreglar la oficina, implementa correctamente el programa FizzBuzz. Si no te sale, no pasa nada, en el comedor está el resto de tus compañeros. Puedes ir a tomarte un cafe.

Escribe un programa que devuelva en una cadena de texto los números de 1 a 100 (ambos incluidos y sin saltos de línea), sustituyendo los siguientes:
 - Múltiplos de 3 por la palabra "fizz".
 - Múltiplos de 5 por la palabra "buzz".
 - Múltiplos de 3 y de 5 a la vez por la palabra "fizzbuzz".
 
 Por ejemplo, para los 5 primeros números, seria: 
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
        active_time_window_start: new Date(2025, 10, 11).toISOString(),
        execution_time_threshold: 10 * 1000,
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
    Resulta que cuando cayó el caos, los otros departamentos nos robaron todas las sillas – las pocas que tenemos. Las hemos recuperado, pero ahora no sabemos cuáles pertenecen al equipo de desarrollo, y cuáles a SAP. Afortunadamente, todas tienen una etiqueta debajo con un número que las identifica, con una regla muy sencilla: todas aquellas sillas cuyo número identificativo sea una potencia de 2, son de desarrollo.&nbsp;
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
                expected_output: '0',
                used_for_scoring: 0,
            },
            {
                input: '17179869184',
                expected_output: '1',
                used_for_scoring: 1,
            },
        ],
        active_time_window_start: new Date(2025, 10, 1).toISOString(),
        execution_time_threshold: 20,
    },

    {
        title: "El teletrabajar se va a acabar",
        description: "Organiza los turnos de trabajo",
        content: `
        <p>
    Con las sillas organizadas, nos hemos dado cuenta de que aún no todas las sillas son cómodas, así que se va a establecer un sistema de turnos para que todos tengamos posibilidad de sentarnos en las sillas buenas: Para una mesa de 6, habrá 6 trabajadores, que irán rotando a izquierdas en las mesas cada día.&nbsp;
</p>
<p>
    Se pide calcular, dado un orden inicial y un día específico, calcular el orden que habrá en ese día.
</p>
<p>
    Ejemplo
</p>
<pre><code class="language-plaintext">orden = [1,2,3,4,5,6]
dia = 2
orden_dia_2 = [3, 4, 5, 6, 1, 2]</code></pre>
<p>
    <strong>Parámetros de entrada</strong>
</p>
<p>
    Una cadena de texto, separada por espacios en la que la primera parte será el número de días objetivo, y el resto, el orden inicial de la mesa.
    <blockquote> 2 123456 </blockquote>
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
        const [target_day, initial_order] = input.split(' ');
        // start here
}`,
        test_cases: [
            {
                input: '2 123456',
                expected_output: '345612',
                used_for_scoring: 0,
            },
            {
                input: '817941 123456',
                expected_output: '456123',
                used_for_scoring: 1,
            },
        ],
        active_time_window_start: new Date(2025, 10, 1).toISOString(),
        execution_time_threshold: 2 * 1000,
    },
    {
        title: "Ciberseguridad 101",
        description: "Regla numero uno, no dejes al becario gestionar las contraseñas.",
        content: `<p>
    Organizando la sala de los servidores, el becario se ha confundido y ha mezclado la caja de las contraseñas de los empleados con la caja de contraseñas señuelo que usamos para que no nos hackeen. ¡Ahora ya no sabemos como entrar al Jira para imputar las horas! Te han encomendado la titánica tarea de filtrar las contraseñas señuelo de las reales. Tras horas de mirar letras, números y palabras raras, hay algo que empieza a hacer clic dentro de ti: ¡los señuelos son una especie de palíndromos! Concretamente, si solo te quedas con las letras de una contraseña, y lo que se queda es un palíndromo, es un señuelo.
</p>
<p>
    Los palíndromos tampoco distinguen las mayúsculas o minúsculas
</p>
<hr>
<p>Para la solución más rápida, te dejo una pista: Puede ser que las contraseñas, señuelo y válidas, se repitan. ¿Qué usamos cuando ya sabemos el resultado de un cómputo? Caché, usamos caché.</p>
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
    Se pide que, teniendo una lista de contraseñas, devuelvas únicamente las que son válidas.
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
    Una cadena de texto con las contraseñas válidas, separadas por espacios también.
</p>`,
        initial_code: `function main(input) {
        // start here
}`,
        test_cases: [
            {
                input: 'abc123cba PowerPass Z 1a2b!cCBA',
                expected_output: 'PowerPass',
                used_for_scoring: 0,
            },
            {
                input: new Array(500_000).fill(1).map((_, i) => 'T.!$Eliot,!$top!$bard,!$notes!$putrid!$tang!$emanating,!$is!$sad;!$Id!$assign!$it!$a!$name:!$gnat!$dirt!$upset!$on!$drab!$pot!$toilet. contraseniabuenabuenasinproblemaninguno!1234 Step45on1234931923491293491923491923941923491923941234nopets No34818234one34818234made34818234killer34818234apparel34818234like34818234Dame34818234Noon. Now143818324I143818324see143818324bees,143818324I143818324won Oozy1234192349192341234rat1234192349192341234in1234192349192341234a1234192349192341234sanitary1234192349192341234zoo').join(' '),
                expected_output: new Array(500_000).fill(1).map(() => 'contraseniabuenabuenasinproblemaninguno!1234').join(' '),
                used_for_scoring: 1,
            }
        ],
        active_time_window_start: new Date(2025, 10, 1).toISOString(),
        execution_time_threshold: 2 * 1000,
    },
    {
        title: "Super Almuerzo",
        description: "Siempre es el cumple de alguien, y nunca me toca nada :(",
        content: `<p>
    A modo de agradecimiento por todo el trabajo que está suponiendo llevar esta empresa a flote, los jefes nos han traído bollería fresca de la gasolinera de al lado.&nbsp;
</p>
<p>
    Sin embargo, no han contado con que todos estaríamos trabajando en la oficina, y no hay para todos por igual. Te han pedido que montes un programa para repartir la comida. Tú, que la verdad no sabes mucho de justicia, pero sí de algoritmos, has pensado que lo mejor sería hacerlo de forma aleatoria, basándote en el número de empleado de cada uno. Para ello, calculando el superstitious de cada empleado, esos serán los bollos que se podrá comer.&nbsp;
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
<hr>
<p>Piensa en por qué envío el parámetro de entrada de esa manera, que podemos hacer para que vaya más rápido.</p>
<p>
    <strong>Formato de entrada</strong>
</p>
<p>
    Una cadena de texto, separada por espacios. La primera parte corresponde a un número, y la segunda a las veces que tienes que concatenar ese número para tener el input objetivo. De esta manera: 
</p>
<blockquote>
148 3
=> 
148148148
</blockquote>
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
                input: '9875 1',
                expected_output: '2',
                used_for_scoring: 0,
            },
            {
                input: '148 3',
                expected_output: '3',
                used_for_scoring: 0,
            },
            {
                input: '2365978831649490136475575038877779575813226775851820912370812124502641538947920808397703549713678494683928497712437176140282589350277653479225520602813456433277417366680426198633681891184348757007292907409160353745221125354212095528784124728447770959861439390350308313917365021363541712618686942946773324003146008424205688630371656757561012224744901800726911246423272186301595490993253791386102270201965996662707215300748516732223935858816466886068592299708740453558018878677753623653080545592459765998008028026982510689469213738241205802446029154833458048894002646934119082621498341445221491190955459548371083839625590505228681017724678315572531551988758568150699821635779156685637531274097856486075649357610713833072735231599919848220063026429718137766286716343385059699133211699189933339174843625266398503099203416124466032711453854413933737536836406105991857744766344461162222670876732729171585512468615558499979720269427922798431312270483732004392503905160233457811525428432787732543799783309593536386190295516419339222642886780012683583264436427241020490358960438948951090123073035203797984302163150042110707217274102457735317367100133807782064391421012191958312396649052833396257876824943425814834615313474161638240747120342368147351931074481983318414461554116111216672594256301273113776892080967125790153125125885441941114178586071406149630777323200516190208241341822285244325578953416388462284725673478766919050744786263188733438572307443267700831425575113213359873223948072988922668251652320316884761627830570057061821492039968369341602081382603302965910382997241199808824091331180464950187035576778206683245316006405529597170652549163351875206280564448346510252775085876212617353369513619186390565654064068546863018765466029315754619416429621887091818939474391383675337791979997519954871635692656223852981330368145996344325688247632566665645262588764650823901065646663460851602833982853795901687202035893967893724362979886948663369428689585509715442019662325024294581705265808022570365351645495802686891955348084550615538750809287498241260408673517746608582833123696027380353038348218786331710334697053069152326732702246704177127367642287975998486114018970510842276024855162228267767755948030029723573646908844109049374244456580474922058250964260437721278380069311972455077102266167098465788845261016395772392904280411167763443571285141388567074805986331207454652671618663858701085276806486000014124900483188940484497173286284987124699515039831183902383877120136788492339903316093693938833730548247174799553092402671083313285813003903363625219370039413610850308966558948057932583576771492037811460439359542902624599661588624295232252616245186844975995180218889230403968087888108494214819234992007182241562844376961711438491105585390645332161544542326095869642445733823661806228697208277656426326128938546125761166960351482948539114133280810916317873360419836067625116114001377672929333638768292095236809153349426894896869446197395671771932928211109385884940274160388152027885130001908095515987519207099973668415699818805100890690896126345099249836616348702742776559368591004254298734292430313132506862931339852599450961120591169865484036943294045257801193102728400887526383477970523720630900867795111210451854194391002244150921934506879640791680297603712618076174694948300699937409787596860516266369711284028834238022724596540529491965656156574337073988564171171562036245389632730259264953520190321920347601255396137920500496074443380910841069973360586715775083998842187392360751892748665579312212647821816086677544702037289983388842777905728540745718314922321086695691823249801139552886748181144717500999021690749662561227798159566905725946118195067702032931332172088385727012140744362147720922176656204772910422189621466379287662792372374145383317294646977085291873933547226857758530880168793511465268400187943977613894365634645591604177130794105552582447385631392788652188052953414781129655671439788151513996304231024358843023105354157338564270003904673736178109502550650713167258319522545824056524791781105181639237127875356417268878249642171688744070159985867211941494396566216365392991627962886902198712613982017603237174682825814797983967054038269833008728407345912699623004623467287738296110774212005294050799218227654983820235796069236099706911525806244933683548619651925300435846989868138976944006822652462513903624200398184640627878400159480147462063679751851193719499676402496701528971830054482832320057097082360875809145428036636600549270698504540758319126452884313155162288201445118708935758033035083555929081756050975974040793712887964439001525986626643925845343840647344753344394209812309532147589135665638895095150172324875219965305745649692175878476631167339609984047545458299489650202318886162798841051758853022389219423402386031324398337411422060786064174337895040820526914615325075313448800789763344707190242881920892579588963376086146960633381215378914452523108903834607764477580583821712879080194987840450703336371649758616364805184545636558639909806705757141231728890945705281578891764357530862478284617890886615612608017861029342475376559517893073874528735689724989147963227442563141916115837740823088920018306622898786665697436694114134566032298418513134640110497915781256013658157626876007303865007938799121914067544773285391447059337068967640221461662745594510968605338966108977317081902507941847885331172633986644666002196037962414608353479436996966565895587993028389782659415971152403029518493019029205611785920255633270560095438637318885230551138363908343081523545591224134467205438637992783829259919217744713264231649621461535887435410548366408012977973203459983761967831442350892580662433295719596302715165438994052920660204857279403439598616231631708579334309451829396365207336409446940374623441420435439989058506571776629533788131454314121504595268258657172190365178279637763408587826711292793610001999656837923788319438384372260168303662843086203813103771712423574817520332644704407707584630263836497460974781867543909787940278207946350316762434685271126547340568379697114143432270663747926423410939366867323227307888313764100323948708488249291932762190879422500980573314510481474989813161818046596342997489244092851481456635241462079248335760582513488928151459281907438730238065382341691833250917737617330046824951709287812847967496061820848573006896422220098029186444659696393722864425443174804115295661452095886127784785656396807536597522937517010395385281668735072368362229248386090765688300603292905737705424037244946746445640174635429078019229973366378415273692915764515173009646632256826278792193749314522687455317800604524740119271772480341422364037622841158408693597798800732407214231715176216414119458470398433698630492023148912788371335047944731850924533486580463894436416946298869397354691924065211837844914014837056117850937923852135361875895012428779496342389871713463333419295329258828037504468306416370691252321110783303933730724981220411655523128107813025668960480700236419568269112404054054013255954297124592253625509027169128346186086879842249233969016492009074059375814396213470661585889025858173286307393463166771278528359358679107663618852904436981159408575155381452852538538161326799566605463071606829507721627760695695298663348037499346965080571845983286426728562771057921340809114888275207834276278723670038713251819678117637307797126524335451875674322135660001938501046206646725087020563845482789165114015140237476770960542212541262365674096922377749965211055083880951870947588439313087505990968967904452943561444336754539161497904651842954423690339860136920316455021978105823558793189756025331264642326253916951167641064028719315782248353333706214902160610987866723541787809188383034860801960339654982067421224921066723519523759569071993168783868197116308035921525346492767986090665094574147296651701824963729081365854249511700896706324052098265362182297874817162325372836249682033460453106454759294279011517085352648052686287835826956331856000530656816094258663224239727567999798475939204052755892731997428948369450364798425229576414764799300949556003266863462364785971588403993047829919672884685002127952124093077144535644623315342420032186819555104280110883937594970132297831017511120535205810256141119655336117669459771376005411248881994640753601606805393583940281645304757423903447751752383876356426048210439751541893763188890403792485964646286690953432929961087972625329578244854544295899075470411907779181886987220577672224785177419791954783277253421243333498197370278143247403594312138218592254174197047846302000164735966226394070001204323764164912690541799927573761616438820835021411743898829210130296149250887986491553547221899402096605456148489590866922112294624680546281250567297009605663936998939340731539740128008013832941045470722922727419033890751091173021386847464099733717633316304536930447077599861319788266450790785072377536483225439587367122393671167950836029510856465462738804587713268436992128892171509071641161165880608224322539890931445909082786991260734902410993863449929626354001121991398640542747424891140797115509495342486678389565402504229791244504867508301342798992744796454984189142033193018659744179186808244403688375727771580862592404226696538971232713170205127941869698531179001250635892043048835137445218382957976989721755706861701366347894376710532041643279157597459032202591566808167568419301491754821992741943996185368155017334681412500723160011387595363158410560488203993638466615700276165502049790282263414502568166837301414930688269694553727263733690839349714652132206285243796184219815308355634318194592022805870387606542297381666905458451054204419608774066516116961329031388338821535694456637910702328420582124442440139995352494707284230907975581024232726130673375360163257154562557607055131368534412734263401317160921075802949888891100336188281116884460133424076740001934250575466042922149519629860344218277351996828116545149383178424384811799946144322536711027462093434842033767504492071349955677051700618860129870409856113128392373584622061075886499407885141951318807519645386474 100000',
                expected_output: '7',
                used_for_scoring: 0,
            },
        ],
        active_time_window_start: new Date(2025, 10, 1).toISOString(),
        execution_time_threshold: 2 * 1000,
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
                input: '1162261467',
                expected_output: '1',
                used_for_scoring: 1,
            },
        ],
        active_time_window_start: new Date(2025, 10, 1).toISOString(),
        execution_time_threshold: 2 * 1000,
    },
    {
        title: "Caos en el comedor",
        description: "La gente tiene sueño, y ganas de tomarse un cafe.",
        content: `<p>Son las nueve de la mañana y la gente está esperando en la cola de las máquinas de cafe del corporativo. Resulta que Vicente ha dicho que hoy había kata, asi que parece que va para largo.</p>
        <p>Antes de ponerse a la fila, el segurata del cafe le ha dado un turno a cada uno, marcando su posición inicial en la fila, desde <strong>1</strong> hasta <strong>n</strong>.</p>
        <p>Los más espabilados están empezando a sobornar al resto para colarse en la fila, desbaratando el orden por completo. Sin embargo, el segurata es bastante perezoso, y dejará que la cola continue siempre y cuando la gente no soborne a más de dos personas cada uno.</p>
        <p>Determina el mínimo número de sobornos que hubo en una cola dado un orden final. Devuelve el número de sobornos o, si alguien ha sobornado a más de dos personas, devuelve -1.</p>
        <p><strong>Ejemplo</strong></p>
        <i>q = [1,2,3,5,4,6,7,8]</i>
        <p>Si la persona <strong>5</strong> soborna a la persona <strong>4</strong> cuando están ordenados, la cola quedaría: <i>1,2,3,5,4,6,7,8</i>. Solo se ha necesitado sobornar a una persona, se devuelve <strong>1</strong>.</p>
        <i>q = [4,1,2,3]</i>
        <p>La persona <strong>4</strong> ha tenido que sobornar a <strong>3</strong> personas para llegar a la posición actual. Devuelve <strong>-1</strong>.</p>
        <p><strong>Formato de entrada</strong></p>
        <p>El parámetro será un listado de números separados por espacios, que corresponderán al orden de la fila tras todos los sobornos.</p>
        
        <p><strong>Formato de salida</strong></p>
        <p>Se devuelve un número correspondiendo al mínimo total de los sobornos que han tenido lugar, o -1 en caso de que alguien haya sobornado a más de 2 personas.</p>
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
        execution_time_threshold: 2 * 1000,
    },
    {
        title: "Popular entre los empleados",
        description: "Si supieran lo que estas pensando, a lo mejor no serias tan popular.",
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
    Dada una matriz <i>n x m</i>, encuentra y devuelve el número de celdas en la región más grande de la matriz. Es posible que haya más de una región por cada matriz.&nbsp;
</p>
<p>
    Por ejemplo, en la siguiente matriz <i>3 x 3</i> hay dos regiones. &nbsp;La región en la esquina superior izquierda contiene <strong>3 celdas.</strong> La más pequeña, de abajo a la derecha contiene solamente <strong>1 celda.</strong>
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
            {
                input: '010000110 110010001 000010100 011101011 011100110 010110110 010011011 101111000',
                expected_output: '29',
                used_for_scoring: 1,
            },
        ],
        active_time_window_start: new Date(2025, 10, 1).toISOString(),
        execution_time_threshold: 2 * 1000,
    }
]

module.exports = problems;