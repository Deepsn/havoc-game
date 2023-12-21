export function getModelFromPart(part: BasePart) {
	let parent = part.Parent;

	while (!parent?.IsA("Model") && parent !== undefined) {
		parent = parent.Parent;
	}

	return parent;
}
