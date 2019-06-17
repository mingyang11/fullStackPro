import React, { Component } from 'react';
import {Card, Button} from 'antd';
import {connect} from 'dva';

const namespace = 'page_card_model';

const mapStateToProps = (state) => {
    const {dataSource} = state[namespace];
    return {dataSource};
}
const mapDispatchToProps = (dispatch) => {
    return {
        onClickAdd: (param) => {
            dispatch({
                type: `${namespace}/addNewCard`,
                payload: param,
            });
        },
        getData: (param) => {
            dispatch({
                type: `${namespace}/getData`,
                payload: param,
            });
        },
    };
};

@connect(mapStateToProps, mapDispatchToProps)

export default class CardPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            cardList: [
                {
                  id: 1,
                  setup: 'Did you hear about the two silk worms in a race?',
                  punchline: 'It ended in a tie',
                },
                {
                  id: 2,
                  setup: 'What happens to a frog\'s car when it breaks down?',
                  punchline: 'It gets toad away',
                },
            ],
        };
    }
    componentDidMount() {
        this.props.getData()
    }
    handleAdd = () => {
        this.props.onClickAdd();
    }
    render() {
        return (
            <div>
                {
                    this.props.dataSource.map(card => {
                        return (
                        <Card key={card.id}>
                            <div>Q: {card.setup}</div>
                            <div>
                            <strong>A: {card.punchline}</strong>
                            </div>
                        </Card>
                        );
                    })
                }
                <Button type="primary" onClick={this.handleAdd}>add card</Button>
            </div>
        );
    }
}