export default function ProjectRelations() {
  return (
    <div>
      <form>
        <input
          id="input"
          name="input"
          className="w-full px-4 py-2"
          placeholder="Add New Data"
        ></input>
        <p>ss</p>
        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-brand-200 text-brand-50 rounded-lg"
        >
          Add
        </button>
        <button className="mt-4 px-6 py-3 ml-2">Refresh</button>
      </form>
    </div>
  );
}
