# ISIS3710-ParcialPractico-202620

## Estudiante

Nombre: Andrés Felipe Alfonso Gamba
Código: 202210412


# Problemas detectados:

1. El botón de "Me gustó" no funciona correctamente y no tiene un evento asociado para manejar el clic del usuario.
2. El botón de "Preguntar al anfitrión" no tiene un evento asociado para manejar el clic del usuario.
3. A pesar de que hay un texto qué indica "Cancelación gratuita hasta 24 horas antes del inicio.", no hay un botón o enlace que permita al usuario cancelar la reserva, lo que puede generar confusión y frustración en el usuario.
4. Color del texto de los formularios. Se pierde el texto.
5. El filtro de búsqueda no filtra de acuerdo al texto ingresado por el usuario. Es decir, si en la página inicial, en la búsqueda ingreso "concierto", no me filtra los planes que contengan la palabra "concierto" en su título o descripción, ni me aparece un mensaje de error al respecto.

# Ubicación (archivo y línea)

1. Archivo: ISIS3710-ParcialPractico-202620\src\app\plans\[id]\page.tsx. Línea 158-164.
2. Archivo: ISIS3710-ParcialPractico-202620\src\app\plans\[id]\page.tsx. Línea 166-169.
3. Archivo: ISIS3710-ParcialPractico-202620\src\app\plans\[id]\page.tsx. Línea 172-174.

# Herramienta que lo detectó

# Regla o principio incumplido

1. El botón de "Me gustó" no tiene un evento asociado para manejar el clic del usuario. Esto incumple el principio de interactividad y accesibilidad, ya que los usuarios esperan que los botones tengan una acción asociada.
2. El botón de "Preguntar al anfitrión" no tiene un evento asociado para manejar el clic del usuario. Esto incumple el principio de interactividad y accesibilidad, ya que los usuarios esperan que los botones tengan una acción asociada.
3. El botón de "Cancelar reserva" no está implementado. Esto incumple el principio de claridad y transparencia, ya que los usuarios esperan tener la opción de cancelar su reserva si así lo desean. 
4. El color del texto de los formularios es muy claro y se pierde en el fondo blanco. Esto incumple el principio de legibilidad y contraste, ya que los usuarios esperan poder leer fácilmente el texto en los formularios sin dificultad.
5. El filtro de búsqueda no filtra de acuerdo al texto ingresado por el usuario. Esto incumple el principio de funcionalidad, ya que los usuarios esperan que la búsqueda funcione correctamente y les muestre resultados relevantes.

# Por qué es un problema o caso especifico 

1. Los usuarios no pueden interactuar con el botón de "Me gustó", que es parte importante de la experiencia de usuario, ya que permite expresar su opinión sobre un plan y ayuda a otros usuarios a identificar planes populares.
2. Los usuarios no pueden interactuar con el botón de "Preguntar al anfitrión", que es parte importante de la experiencia de usuario, ya que permite hacer preguntas sobre un plan y obtener información adicional antes de tomar una decisión.
3. Los usuarios no pueden cancelar su reserva, lo que puede generar frustración y desconfianza en la plataforma, ya que los usuarios esperan tener la opción de cancelar su reserva si así lo desean.
4. El color del texto de los formularios es muy claro y se pierde en el fondo blanco, lo que dificulta la lectura y puede generar errores al ingresar información. Esto afecta la experiencia de usuario y puede llevar a la pérdida de clientes potenciales.
5. Los usuarios no pueden filtrar los planes según sus intereses, lo que limita su capacidad para encontrar planes relevantes y puede llevar a una experiencia de usuario insatisfactoria.

Correción

1. Agregar un evento onClick al botón de "Me gustó" que maneje la acción de dar me gusta a un plan.
2. Agregar un evento onClick al botón de "Preguntar al anfitrión" que maneje la acción de enviar una pregunta al anfitrión del plan.
3. Implementar un botón o enlace que permita a los usuarios cancelar su reserva, y asociar un evento onClick que maneje la acción de cancelar la reserva.
4. Cambiar el color del texto de los formularios a uno más oscuro y contrastante con el fondo blanco, para mejorar la legibilidad.
5. Implementar la funcionalidad de filtrado de búsqueda para que los planes se filtren según el texto ingresado por el usuario, y mostrar un mensaje de error si no hay resultados relevantes.