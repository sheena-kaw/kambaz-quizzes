import PeopleTable from "./Table/page";

export default function People() {
  return (
    <>
      <h2> People </h2>
      <PeopleTable fetchUsers={function (): void {
        throw new Error("Function not implemented.");
      } }/>
    </>
  );
}
