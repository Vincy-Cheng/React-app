import logo from "./logo.svg";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import React from "react";
import Images from "./Images";
import { useState } from "react";
import { shuffle } from "lodash";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useMatch,
  useParams,
  useLocation,
} from "react-router-dom";

const data = [
  {
    filename: "cuhk-2013.jpg",
    year: 2013,
    remarks: "Sunset over CUHK",
  },
  {
    filename: "cuhk-2017.jpg",
    year: 2017,
    remarks: "Bird's-eye view of CUHK",
  },
  {
    filename: "sci-2013.jpg",
    year: 2013,
    remarks: "The CUHK Emblem",
  },
  {
    filename: "shb-2013.jpg",
    year: 2013,
    remarks: "The Engineering Buildings",
  },
  {
    filename: "stream-2009.jpg",
    year: 2009,
    remarks: "Nature hidden in the campus",
  },
];

// const CS = [
//   {
//     filename: "01.jpg"
//   },
//   {
//     filename: "02.jpg"
//   },
//   {
//     filename: "03.jpg"
//   },
//   {
//     filename: "04.jpg"
//   },
//   {
//     filename: "05.jpg"
//   },
//   {
//     filename: "06.jpg"
//   },
//   {
//     filename: "07.jpg"
//   },
//   {
//     filename: "08.jpg"
//   },
//   {
//     filename: "09.jpg"
//   },
//   {
//     filename: "10.jpg"
//   },
//   {
//     filename: "11.jpg"
//   },
//   {
//     filename: "12.jpg"
//   },
//   {
//     filename: "13.jpg"
//   },
//   {
//     filename: "14.jpg"
//   },
//   {
//     filename: "15.jpg"
//   },
//   {
//     filename: "16.jpg"
//   },
//   {
//     filename: "17.jpg"
//   },
//   {
//     filename: "18.jpg"
//   },
// ]
function App() {
  return (
    <>
      {/* will have more than one component */}
      {/* Title component & Gallery component */}
      <Title name="React App" />
      <BrowserRouter>
        <div className="row">
          <div className="col-2 list ">
            <ul>
              <LongLink to="/" label="Home" />
              <LongLink to="/gallery" label="Images" />
              <LongLink to="/slideshow" label="Slideshow" />
              <LongLink to="/memory_game" label="Memory_game" />
              <LongLink to="/tictactoe" label="Tictactoe" />
            </ul>
            {/* <hr /> */}
          </div>
          <div className="col content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/slideshow" element={<Slideshow />} />
              <Route path="/memory_game" element={<Memory_game />} />
              <Route path="/tictactoe" element={<Tictactoe />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </div>
        <div></div>
      </BrowserRouter>
    </>
  );
}

class Title extends React.Component {
  render() {
    return (
      // that is bootstrap element
      <header
        className="bg-warning px-2 py-2 titlehead"
        style={{ width: "100vw" }}
      >
        {/* right now is CUHK Pictures */}
        <h1 className="display-4 textcenter ">{this.props.name}</h1>
        <p>Created by Cheng Wing Lam</p>
      </header>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <div className="p-2">
        <h2>Home</h2>
        <h5>Tree diagram of react component</h5>
        <img src="Tree-diagram.png" alt="diagram" style={{ width: "80vw" }} />
      </div>
    );
  }
}

class Gallery extends React.Component {
  render() {
    return data.map((file, index) => <FileCard i={index} key={index} />);
  }
}

class FileCard extends React.Component {
  handleClick(index, e) {
    if (this.state.selected != index) {
      this.setState({ selected: index });
      console.log(index);
    } else {
      this.setState({ selected: -1 });
    }
  }

  constructor(props) {
    super(props);
    this.state = { selected: -1 };
    {
      /* this syntax should only be used
      in the constructor, and otherwise
      this.setState() must be used */
    }
  }

  render() {
    let i = this.props.i;
    return (
      <div
        className="card d-inline-block m-2"
        style={{ width: this.state.selected == i ? 220 : 200 }}
        onMouseOver={(e) => this.handleClick(i, e)}
        onMouseOut={(e) => this.handleClick(i, e)}
      >
        <img src={"images/" + data[i].filename} className="w-100" />
        <div className="card-body">
          <h6 className="card-title">{data[i].filename}</h6>
          <p className="card-text">{data[i].year}</p>
        </div>
      </div>
    );
  }
}

function LongLink({ label, to }) {
  let match = useMatch({
    path: to,
  });
  return (
    <li className={match ? "active" : ""}>
      {match && "> "}
      <Link to={to}>{label}</Link>
    </li>
  );
}

function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

class Slideshow extends React.Component {
  play() {
    let len = data.length;
    // useEffect()
    this.intervalID = setInterval(() => {
      if (this.state.selected < len - 1) {
        let index = this.state.selected + 1;
        this.setState({ selected: index });
        console.log(this.state.selected);
        console.log(this.state.currentInterval);
        console.log("IntervalID", this.intervalID);
      } else {
        this.setState({ selected: 0 });
        console.log(this.state.selected);
      }
      // console.log('This will run every second!');
    }, this.state.currentInterval);
  }

  stop() {
    clearInterval(this.intervalID);
  }

  faster() {
    if (this.intervalID) {
      if (this.state.currentInterval > 250) {
        let speed = this.state.currentInterval - 250;
        this.setState({ currentInterval: speed });
      }
      this.stop();
      this.play();
    }
  }

  slower() {
    if (this.intervalID) {
      let speed = this.state.currentInterval + 250;
      this.setState({ currentInterval: speed });
      this.stop();
      this.play();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      currentInterval: 1500,
    };
    {
      /* this syntax should only be used
      in the constructor, and otherwise
      this.setState() must be used */
    }
  }
  render() {
    let i = this.state.selected;
    return (
      <div>
        <div className="m-2">
          <img src={"images/" + data[i].filename} style={{ width: 300 }} />
          <div className="card-body">
            <h6 className="card-title">{data[i].filename}</h6>
            <p className="card-text">{data[i].year}</p>
          </div>
        </div>
        <button
          type="button"
          className="mx-2 btn btn-success"
          onClick={(e) => {
            this.play();
          }}
        >
          Start slideshow
        </button>
        <button
          type="button"
          className="mx-2 btn btn-danger"
          onClick={(e) => {
            this.stop();
          }}
        >
          Stop slideshow
        </button>
        <button
          type="button"
          className="mx-2 btn btn-warning"
          onClick={(e) => {
            this.faster();
          }}
        >
          Faster
        </button>
        <button
          type="button"
          className="mx-2 btn btn-info"
          onClick={(e) => {
            this.slower();
          }}
        >
          Slower
        </button>
      </div>
    );
  }
}

function Memory_game() {
  // reference link: https://github.com/dejwid/react-memo
  // Youtube link: https://www.youtube.com/watch?v=k91Erl0VAc8
  const [cards, setCards] = useState(shuffle([...Images, ...Images]));
  const [activeCards, setActiveCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [won, setWon] = useState(false);
  function flipCard(index) {
    if (won) {
      setCards(shuffle([...Images, ...Images]));
      setFoundPairs([]);
      setWon(false);
      setClicks(0);
    }
    if (activeCards.length === 0) {
      setActiveCards([index]);
    }
    if (activeCards.length === 1) {
      const card1 = activeCards[0];
      const card2 = index;
      if (cards[card1] === cards[card2]) {
        if (foundPairs.length + 2 === cards.length) {
          setWon(true);
        }
        setFoundPairs([...foundPairs, card1, card2]);
        //alert("You found a pair!")
      }
      setActiveCards([...activeCards, index]);
    }
    if (activeCards.length === 2) {
      setActiveCards([index]);
    }
    setClicks(clicks + 1);
    //console.log(clicks);
  }

  function restart() {
    setCards(shuffle([...Images, ...Images]));
    setFoundPairs([]);
    setWon(false);
    setClicks(0);
    setActiveCards([]);
  }

  return (
    <div>
      <h2>Memory game</h2>
      <div className="board">
        {cards.map((card, index) => {
          const flippedToFront =
            activeCards.indexOf(index) !== -1 ||
            foundPairs.indexOf(index) !== -1;
          return (
            <div
              className={"card-outer " + (flippedToFront ? "flipped" : "")}
              onClick={() => flipCard(index)}
            >
              <div className="card2">
                <div className="front">
                  <img src={card} alt="" />
                </div>
                <div className="back" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="stats my-2">
        {won && (
          <>
            You won the game! Congratulations!
            <br />
          </>
        )}
        Clicks: {clicks} &nbsp;&nbsp;&nbsp; Found pairs:{foundPairs.length / 2}
        <br />
        Click restart button to start a new game
        <button className="btn btn-danger mx-2" onClick={() => restart()}>
          restart
        </button>
      </div>
    </div>
  );
}

function Tictactoe() {
  const [turns, setTurns] = useState("x");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();
  const checkwinner = (square)=>{
    let line ={
      horizontal:[
        [0,1,2],
        [3,4,5],
        [6,7,8]
      ],
      vertical:[
        [0,3,6],
        [1,4,7],
        [2,5,8]
      ],
      cross:[
        [0,4,8],
        [2,4,6]
      ]
    }

    for(let c in line){
      line[c].forEach((pattern)=>{
        if (square[pattern[0]]===''||
        square[pattern[1]]===''||
        square[pattern[2]]==='') {
          
        }else if(square[pattern[0]]===square[pattern[1]]&&
          square[pattern[0]]===square[pattern[2]]){
            setWinner(square[pattern[0]])
        }
      })
    }
  }
  const handleClick = (num) => {
    // alert(num)
    if (cells[num]!=='' ) {
      alert("Alrady clicked")
      return;
    }
    if (winner) {
      alert("The game is stopped\nStart a new game")
      return
    }
    let square = [...cells];
    if (turns === "x") {
      square[num] = "x";
      setTurns("o");
    } else {
      square[num] = "o";
      setTurns("x");
    }
    checkwinner(square)
    setCells(square)
    //console.log(square)
  };

  const handlerestart =()=>{
    setWinner();
    setCells(Array(9).fill(""))
  }
  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };
  return (
    <div>
      <h2>Tictactoe</h2>
      <div className="board2">
      Turn: {turns}
        <table id="tictactoe">
          
          <tbody>
            <tr>
              <Cell num={0} />
              <Cell num={1} />
              <Cell num={2} />
            </tr>
            <tr>
              <Cell num={3} />
              <Cell num={4} />
              <Cell num={5} />
            </tr>
            <tr>
              <Cell num={6} />
              <Cell num={7} />
              <Cell num={8} />
            </tr>
          </tbody>
        </table>
        
      </div>
      <div className="stats my-2">
        {winner && (
          <>
          <p>{winner} is the winner!</p>
          <br />
          
          </>
          
        )}
        Click restart button to start a new game
        <button className="btn btn-danger mx-2" onClick={() => handlerestart()}>
          restart
        </button>
        </div>
    </div>
  );
}

export default App;
