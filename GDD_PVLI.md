# “PSY: PURRS AND CRAFTS”

UROBOROS STUDIOS

Equipo de desarrollo:

Celia García Riaza Diego Martín Gutiérrez

Carmen Rosino Vílchez Hao Zheng


## Índice


## 1. Descripción general

-Historia: una ciudad fue arrasada por una catástrofe, dejándola completamente desolada y sin ningún alma a la vista. No obstante, un gato (Psy) sobrevivió gracias a su inconmensurable aura. Ahora busca sobrevivir por su cuenta, reconstruyendo su entorno con valentía.

-Concepto: el juego se desarrollará para un entorno web y con gráficos en 2D (top down) y con arte pixel art.

-Géneros del juego: se trata de un juego de un solo jugador de acción, supervivencia y construcción.

## 2. Objetivo del juego

El juego no posee un final definido, es decir, no hay un punto en el que acaba, sino que está pensado para ser muy rejugable. Por este motivo se definen unos logros que si el jugador completa quiere decir que ha llegado hasta el final de una funcionalidad concreta.

Definimos dos logros principales: uno por haber llevado tu base de supervivencia al máximo nivel todos los edificios, y otro por haber descubierto todas las recetas.

## 3. Mecánicas

## 3.1. Mecánicas de construcción

## 3.1.1. Crafteo

Para desbloquear el crafteo hay que conseguir recetas, que se pueden obtener subiendo de nivel algunas salas o explorando el mapa.

Cuando se quiera fabricar algo se abre la interfaz de crafteo y aparecerán en rojo las recetas que no se puedan hacer por falta de materiales y en verde las que sí se puedan.

Basta con clicar sobre una receta verde para crear el objeto deseado, éste se guardará inmediatamente en el inventario.

-Boceto de la interfaz de crafteo:


A la derecha aparece el inventario del jugador y a la izquierda los objetos cuya receta se ha descubierto. Al colocar el cursor encima del objeto aparece su descripción. En el lado izquierdo se podrá hacer scroll.

## ● Construcción de la base:

El jugador dispondrá de una base la cual servirá de refugio, este podrá ir mejorando la base a base de construir distintas salas con tamaño predeterminado, que aumentarán tanto la resistencia de esta como las estadísticas personales del jugador. Para realizar salas, el jugador deberá de levantar paredes (las cuales necesitarán recursos para ser construidas) y colocar al menos una puerta. Recetas y funcionamiento de las salas:

- \- Cocina: será una habitación en donde se podrán cocinar distintos ingredientes para hacer mejores comidas, cada mejora de la habitación desbloquea nuevos tipos de estaciones (sartenes, horno, microondas, etc) para realizar más recetas.

- \- Dormitorio: será una habitación en donde el jugador podrá dormir en una cama para recargar su barra de Descanso, el tiempo irá pasando más rápido conforme al porcentaje que se llena de la barra de Descanso (ej: por cada 15% el mundo avanza 1 minuto). Conforme se va mejorando, cada nivel otorgará mejoras al jugador cada vez que termine de dormir (recupera más vida al dormir con cada mejora).

- \- Taller: será la habitación en donde estén todos los bancos de trabajo, utilizando un banco de trabajo en esta habitación permitirá hacer objetos de mayor calidad comparado con utilizando un banco fuera de esta. Mejorando esta sala con muebles de mayor calidad desbloquea nuevas recetas.

- \- Baño: habitación que sirve para recargar el medidor de higiene, mejorar esta sala resultará en mejoras temporales para el jugador cada vez que utilice la sala.

- \- Almacén: sala para guardar objetos y materiales. Conforme se vaya mejorando esta habitación mayor capacidad tendrá.

- \- Armería: sala para mejorar los stats con orbes de aura que dropean los enemigos.

## ● Listado de materias primas:

- \- Madera: se obtiene de los árboles.

- \- Piedra: se obtiene de montículos de piedras.


- \- Ladrillo: se obtiene de edificios derribados.

- \- Agua: se obtiene del lago.

- \- Carbón: se obtiene en cofres o en la ciudad y la zona nevada.

- \- Colmillos, piel y carne: se obtienen al derrotar perros.

- \- Paja: se obtiene de los hierbajos secos de la zona del lago.

- \- Semillas: se obtiene de cofres esparcidos en las zonas.

## ● Listado de objetos para construir:

Aquellos que sean herramientas tendrán una durabilidad, es decir, mientras el jugador las usa se irán debilitando, eventualmente rompiéndose y el jugador tendrá que hacer otras nuevas.

- \- Espada de piedra: 2 madera, 6 piedra.

- \- Espada de hierro: 2 madera, 6 hierro.

- \- Metal : 1 carbón, 2 hierro.

- \- Antorcha: 1 madera, 1 carbón.

- \- Pico piedra: 4 madera, 3 piedra.

- \- Hacha piedra: 4 madera, 6 piedra.

## 3.1.2. Inventario

Los objetos en el inventario se organizan por slots, en cada slot hay un tipo distinto de recurso (ej: un slot tiene piedra y otro carne) y cada slot tendrá una capacidad máxima de objetos. El inventario tendrá un tamaño de 4 x 4.

## 3.2. Mecánicas de supervivencia

## 3.2.1. Aura

El aura será la mecánica que actuará como la vida del personaje, este se disminuye al recibir daño de los enemigos y afecta a tus estadísticas base, es decir, cuanto menos aura posees, más débil eres.

## Estadísticas de combate

El jugador dispondrá de diferentes estadísticas base, estos tendrán unos valores iniciales que podrán aumentar dependiendo del equipamiento que se encuentre el jugador o disminuir dependiendo del nivel del aura.

Las estadísticas base se comprenden en:

- \- Ataque: el daño que haces a los enemigos.

- \- Defensa: reduce el daño que recibe el jugador.

- \- Velocidad: determina la rapidez de movimiento.

La única estadística que no dependerá del aura será la estamina, que será un valor fijo (se podrá modificar con objetos como armaduras).


## Estadísticas de supervivencia

Estas estadísticas son las que el jugador deberá encargarse de mantener altas si no quiere perder vida o sufrir desventajas en su experiencia de juego.

- \- Hambre: si Psy está mucho tiempo sin comer éste perderá vida poco a poco por desnutrición.

- \- Sueño: si Psy tiene mucho sueño su velocidad se reducirá. Solo se puede dormir si el medidor está un cuarto llenado o menos

- \- Higiene: mientras más sucio esté Psy su defensa bajará; además de afectar al inventario, pues éste comenzará a llenarse de pulgas.

- \- Vida: cantidad de aura que posee Psy, y ésta llega a 0 el personaje muere. Se recupera comiendo o durmiendo.

- \- Stamina: permite a Psy correr. Si ésta llega a 0 Psy se cansará y el jugador deberá esperar a que se recargue de nuevo para poder correr.

## Éstas son:

## 3.2.2. Tiempos del día

En cada tiempo del día (mañana, tarde y noche) hay distintos eventos que solo pueden suceder durante ese periodo del día.

- \- Mañana: al recolectar materiales hay un 50% de probabilidad de recibir el doble.

- \- Tarde: será un periodo sin ningún evento especial.

- \- Noche: aparecen los enemigos del tipo fantasma, lo cual hace más peligroso salir de la base, pero los cofres tienen recursos más valiosos.

Cada vez que se inicia un nuevo día, el juego realiza un guardado automático, por si los enemigos destruyen la caja, para poder volver a empezar desde ahí.

## 3.2.3. Muerte

Cuando el jugador se muere reaparece en la base y puede ir a por su inventario, el cual se encontrará en el sitio donde murió, pero si vuelve a morir antes de recuperar sus objetos estos desaparecen y son irrecuperables.

## 3.2.4. Enemigos

Todos los enemigos del juego, aunque cada uno tiene una probabilidad de soltar materiales propios, tras morir te dan orbes de aura, que sirven para fortalecer las estadísticas de Psy (éstos no se almacenarán en el inventario).

## Perros

Son el enemigo principal del juego, aparecerán en todas las zonas del mapa salvo en la Zona Radiactiva.

| Cantidad de vida | 150 |
| --- | --- |


| Defensa | 12 |
| --- | --- |
| Ataque | 20 |
| Velocidad | 20 |
| Objetos que puede dejar y probabilidad | Carne 75% |
|   | Piel 60% |
|   | Colmillos 45% |

## Fantasmas

Son los espíritus de los gatos que no se pudieron salvar que atormentan a Psy durante la noche, aparecen en todas las zonas del juego pero no pueden atacar tu base. Serán enemigos muy fuertes lo cual obstaculiza la exploración del entorno.

| Cantidad de vida | 300 |
| --- | --- |
| Defensa | 20 |
| Ataque | 40 |
| Velocidad | 30 |
| Objetos que puede dejar y probabilidad | Espada de espíritus - 5% |

## Cucarachas

Estos enemigos son exclusivos a la Zona Radiactiva y serán de los enemigos más poderosos de todo el juego. No son capaces de salir de su zona.

| Cantidad de vida | 750 |
| --- | --- |
| Defensa | 50 |
| Ataque | 30 |
| Velocidad | 50 |
| Objetos que puede dejar y probabilidad | (Por decidir) |

## 3.2.5. Combate

El combate se desarrolla en el mundo de juego a tiempo real, en el que los enemigos se moverán libremente por el mapa cada uno con una zona de patrulla establecida anteriormente, si el jugador entra en este área, el enemigo comenzará a perseguir a Psy.


A la hora de entrar en combate, Psy tendrá que derrotar enemigos mediante el uso de espadas que irá recolectando a lo largo del juego, ya sea mediante el crafteo, o por cofres.

Para utilizar las espadas, Psy tendrá que tenerlas equipadas y tendrá que darle a la tecla correspondiente al ataque para poder hacer daño a los enemigos.

En el caso de que el jugador no disponga de un arma, podrá defenderse utilizando las garras, aunque esto hará menos daño que las espadas.

## 4. Bucle de juego

## 5. Personaje principal

Como se ha comentado en el apartado 1, el jugador controlará a un gato a lo largo del juego. Éste posee, además de unas estadísticas de combate y supervivencia, las primeras son ataque, defensa, velocidad y las últimas vida, stamina, hambre, sueño e higiene.

| Cantidad de vida | 150 |
| --- | --- |
| Puntos de stamina | 100 |
| Sueño | 65 |
| Hambre | 100 |
| Higiene | 85 |
| Stats iniciales de combate | Ataque 15 |
|   | Defensa 15 |
|   | Velocidad 15 |


- 6. Mapa

- \- Ciudad: será la primera zona del juego y en donde la base estará ubicada, los enemigos en esta zona serán los perros. Aquí se encuentra el Mercadona, sitio donde conseguir comida para sobrevivir.

- \- Zona radioactiva: será la zona más peligrosa de todo el juego, además de habitar a los enemigos más peligrosos, el mapa tendrá charcos/ríos/lagos de líquido radiactivo que hará daño progresivo al jugador mientras entre en contacto con él.

- \- Lago: será la zona del juego más abundante en agua y naturaleza (árboles, lago, arbustos, etc), se podrá recolectar agua y nadar en él utilizando un objeto específico (para recoger materiales exclusivos).

- \- Zona nevada: es la zona más rica en recursos del juego, pues cuenta con minerales raros y objetos abandonados de personas que montaron refugios allí, abandonaron sus objetos y ya no fueron reclamados más.

Imagen del mapa (distribución de las zonas):

Bocetos de cada zona:


- 7. Controles

- \- Movimiento de personaje: WASD.

- \- Correr: LSHIFT.

- \- Ver estadísticas: TAB.

- \- Interactuar: F.

- \- Atacar: clic izquierdo.

- \- Abrir inventario: E.


## 8. HUD y cámara

En el HUD aparecerá la barra de vida (aura) y de stamina en detalle a lo largo de toda la experiencia de juego.

Las otras estadísticas, tanto las de supervivencia como las de ataque, se mostrarán gráficamente, y cuando se presiona la tecla tab, se mostrarán en detalle. Por ejemplo, si la defensa se disminuye por culpa de una mala higiene, en las estadísticas en detalle se indicará cuánto se ha disminuido, por ejemplo, si se ha reducido un 20% en la defensa pondrá: “x0,8”. Las estadísticas de supervivencia se muestran en porcentajes.

## \- Boceto del HUD:

Como se mencionó en el primer apartado, la vista de la cámara el top-down. Además, ésta seguirá al jugador en todo momento y se encontrará bastante alejada del jugador, para que éste pueda observar correctamente los alrededores mientras explora.

## 9. Referencias

- “Don’t Starve”: juego de supervivencia y terror, sobre él tomamos como inspiración las estadísticas de supervivencia y el modelo de recolección de materiales.

- “Dragon Quest Builders”: juego de rol y construcción, de él nos basamos en el modelo de construcción de la base.

- “Minecraft”: videojuego de construcción, del cual nos basamos para la exploración del mapa y el sistema de crafteo.
