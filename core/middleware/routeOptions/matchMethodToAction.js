module.exports= function (method) {
	
	switch (method) {
		case "GET":
			return "find";
			break;
		case "GET_ID":
			return "findOne";
			break;
		case "POST":
			return "create";
			break;
		case "PUT":
			return "update";
			break;
		case "DELETE":
			return "destroy";
			break;
		case "GET_POPULATE":
			return "populate";
			break;
		case "GET_POPULATE_ID":
			return "populateOne";
			break;
		case "POST_POPULATE":
			return "add";
			break;
		case "DELETE_POPULATE":
			return "remove";
			break;
		default:
			return null;
			break;
	}
}