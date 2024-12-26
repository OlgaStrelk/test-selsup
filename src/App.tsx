import React, { Component } from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  name: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      paramValues: props.model.paramValues,
    };
  }

  handleParamChange = (paramId: number, value: string) => {
    this.setState((prevState) => {
      const updatedValues = prevState.paramValues.map((paramValue) =>
        paramValue.paramId === paramId
          ? { ...paramValue, value }
          : paramValue
      );

      return { paramValues: updatedValues };
    });
  };

  public getModel(): Model {
    return {
      paramValues: this.state.paramValues,
      colors: this.props.model.colors,
    };
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        {params.map((param) => {
          const value = paramValues.find((pv) => pv.paramId === param.id)?.value || '';

          return (
            <div key={param.id}>
              <label style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}
              >
                {param.name}:
                <input
                  type="text"
                  value={value}
                  onChange={(e) => this.handleParamChange(param.id, e.target.value)}
                />
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

const exampleParams: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const exampleModel: Model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
  colors: [],
};

const App = () => {
  const paramEditorRef = React.createRef<ParamEditor>();

  const handleGetModel = () => {
    if (paramEditorRef.current) {
      const model = paramEditorRef.current.getModel();
      console.log('Updated Model:', model);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      <h1>Редактор параметров</h1>
      <ParamEditor ref={paramEditorRef} params={exampleParams} model={exampleModel} />
      <button onClick={handleGetModel}>Получить модель</button>
    </div>
  );
};

export default App;

