import React from "react";

export interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

export interface ParamValue {
  paramId: number;
  value: string;
}

type ParamType = "string" | "list" | "number";

export interface Param {
  id: number;
  name: string;
  type: ParamType;
}

export interface Color {
  id: number;
  value: string;
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  values: Record<number, string>;
}

export class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const initValues: Record<number, string> = {};
    props.params.forEach((param) => {
      if (param.type === "string") {
        const existing = props.model.paramValues.find(
          (val) => val.paramId === param.id
        );
        initValues[param.id] = existing ? existing.value : "";
      }
    });

    this.state = {
      values: initValues,
    };
  }

  handleChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        [paramId]: value,
      },
    }));
  };

  public getModel(): Model {
    const paramValues: ParamValue[] = Object.entries(this.state.values).map(
      ([paramId, value]) => ({
        paramId: Number(paramId),
        value,
      })
    );

    return {
      paramValues,
      colors: [],
    };
  }

  render() {
    return (
      <div>
        {this.props.params.map((param) => (
          <div key={param.id} style={{ marginBottom: "10px" }}>
            <label style={{ marginRight: "10px", fontWeight: "bold" }}>
              {param.name}
            </label>

            {param.type === "string" && (
              <input
                type="text"
                value={this.state.values[param.id] || ""}
                onChange={(e) => this.handleChange(param.id, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}
