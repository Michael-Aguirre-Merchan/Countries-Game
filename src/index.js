import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const data = {
  Colombia: "Bogota",
  Alemania: "Berlin",
  Mexico: "Ciudad de Mexico",
};

function getArray(currentData) {
  const countries = Object.keys(currentData);
  const capitals = Object.values(currentData);
  return countries.concat(capitals).sort(() => Math.random() - 0.5);
}

function ListElement(props) {
  return (
    <button
      className={props.oneSelected === props.value ? "selected" : ""}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class List extends React.Component {
  render() {
    return (
      <>
        {this.props.data.map((current) => (
          <>
            <ListElement
              key={current}
              value={current}
              onClick={() => this.props.onClick(current)}
              oneSelected={this.props.oneSelected}
            />{" "}
          </>
        ))}
      </>
    );
  }
}

class Game extends React.Component {
  onClick(value) {
    if (!this.state.oneSelected) {
      this.setState({ oneSelected: value });
    } else {
      if (
        Object.keys(data).includes(value) ||
        Object.keys(data).includes(this.state.oneSelected)
      ) {
        if (
          data[value] === this.state.oneSelected ||
          data[this.state.oneSelected] === value
        ) {
          const lastValue = this.state.oneSelected;
          this.setState({
            currentData: this.state.currentData.slice().filter(function (item) {
              return item !== lastValue && item !== value;
            }),
            oneSelected: null,
          });
        } else {
          this.setState({ oneSelected: null });
        }
      } else {
        this.setState({ oneSelected: null });
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      oneSelected: null,
      currentData: getArray(data),
    };
  }
  render() {
    if (this.state.currentData.length > 0) {
      return (
        <div className="game-board">
          <List
            data={this.state.currentData}
            onClick={(value) => this.onClick(value)}
            oneSelected={this.state.oneSelected}
          />
        </div>
      );
    } else {
      return (
        <div>
          <div>Congrats! You won</div>
        </div>
      );
    }
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
