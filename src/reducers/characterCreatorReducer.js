const initState = {
	newCharacter: {
		metatypePriority: "",
		attributePriority: "",
		magicPriority: "",
		skillPriority: "",
		resourcePriority: "",
		ap: 0,
		specialAP: 0,
		name: "",
		charID: 0,
		metatype: "",
		magicRole: "",
		attributes: {
			body: 0,
			bodyMax: 0,
			agility: 0,
			agilityMax: 0,
			reason: 0,
			reasonMax: 0,
			strength: 0,
			strengthMax: 0,
			will: 0,
			willMax: 0,
			logic: 0,
			logicMax: 0,
			intelligence: 0,
			intelligenceMax: 0,
			charisma: 0,
			charismaMax: 0,
			edge: 0,
			edgeMax: 0,
			essence: 6,
			initiative: 0,
			magic: 0,
			resonance: 0,
		},
		magic: [],
		skills: [],
		resources: 0,
	},
};

// Character creator reducer changes redux store state between each of the character creation pages
const characterCreatorReducer = (state = initState, action) => {
	if (action.type === "POPULATE_TABLE") {
		return {
			...state,
			newCharacter: {
				...state.newCharacter,
				name: action.name,
				metatypePriority: action.metatypePriority,
				attributePriority: action.attributePriority,
				magicPriority: action.magicPriority,
				skillPriority: action.skillPriority,
				resourcePriority: action.resourcePriority,
				resources: action.resources,
			},
		};
	} else if (action.type === "METATYPE") {
		return {
			...state,
			newCharacter: {
				...state.newCharacter,
				metatype: action.metatype,
				magicRole: action.magicRole,
				specialAP: action.specialAP,
				attributes: {
					...state.newCharacter.attributes,
					magic: action.magic,
					resonance: action.resonance,
				},
			},
		};
	} else if (action.type === "ATTRIBUTES") {
		return {
			...state,
			newCharacter: {
				...state.newCharacter,
				attributes: action.attributes,
			},
		};
	} else if (action.type === "CREATE_CHAR") {
		return {
			...state,
			newCharacter: initState,
		};
	} else if (action.type === "CREATE_CHAR_ERROR") {
		console.log("Character creation error", action.err);
		return state;
	}

	return state;
};

export default characterCreatorReducer;
