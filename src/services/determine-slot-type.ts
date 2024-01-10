import { match } from "ts-pattern";

export default async function determineSlotType(x: string[]) {
	return match([
			x.length,
			Boolean(x.find(y => y === "f2f")),
			Boolean(x.find(y => y === "self")),
			Boolean(x.find(y => y === "case")),
			Boolean(x.find(y => y === "group"))
		])

		.with([4, true, true, true, true], () => "all-slots")
		
		.with([3, true, false, true, true], () => "no-self")
		.with([3, true, true, false, true], () => "no-case")
		.with([3, true, true, true, false], () => "no-group")
		.with([3, false, true, true, true], () => "no-f2f")
		
		.with([2, false, true, true, false], () => "self-case")
		.with([2, false, true, false, true], () => "self-group")
		.with([2, true, true, false, false], () => "self-f2f")
		.with([2, false, false, true, true], () => "case-group")
		.with([2, true, false, true, false], () => "case-f2f")
		.with([2, true, false, false, true], () => "group-f2f")

		.with([1, false, true, false, false], () => "self-only")
		.with([1, false, false, true, false], () => "case-only")
		.with([1, false, false, false, true], () => "group-only")
		.with([1, true, false, false, false], () => "f2f-only")

		.otherwise(() => { throw new Error("invalid slot type") })
};