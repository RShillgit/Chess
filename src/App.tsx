import ChessBoard from "./components/ChessBoard";

const App = () => {

  return (
    <div>
      <h1 className="flex justify-center text-3xl">Chess</h1>

      <div className="flex justify-center">
        <ChessBoard />
      </div>
    </div>
  )

}

export default App;