module.exports = {
	resolveSnapshotPath: (testPath, snapshotExtension) => {
		return `${testPath}.${snapshotExtension}`.replace(/src[/\\]Components/, "__tests__/__snapshots__")
	},

	resolveTestPath: (snapshotFilePath, snapshotExtension) => {
		return snapshotFilePath.replace(`.${snapshotExtension}`, "").replace(/__tests__[/\\]__snapshots__/, "src/Components")
	},

	testPathForConsistencyCheck: "src/components/some.test.js"
}
