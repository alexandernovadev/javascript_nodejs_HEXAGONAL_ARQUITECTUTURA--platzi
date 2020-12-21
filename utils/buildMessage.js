function buildMessage(entity, action) {

  // Esta funcion retorna el mensaje de api
  // como movie created o movie listed
  // pero el profe creo una funcion para esto
  // lo cual se me hace mucho trabajo para algo
  // pero pues es para la practica
  if (action === 'list') {
    return `${entity}s ${action}ed`;
  }

  return `${entity} ${action}d`;
}

module.exports = buildMessage;