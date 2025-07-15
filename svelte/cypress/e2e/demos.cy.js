const cases = [
	"/base/:skin",
	"/client/:skin",
	"/controls/:skin",
	"/api/:skin",
	"/dropzone/:skin",
];

const skins = ["material", "willow", "willow-dark"];
const links = [];

cases.forEach(w => {
	skins.forEach(s => {
		links.push(w.replace(":skin", s));
	});
});

context("Basic functionality", () => {
	it("widget", () => {
		links.forEach(w => {
			cy.visit(`/index.html#${w}`);
			cy.wait(100);
			cy.shot(w, { area: ".content" });
		});
	});
});
