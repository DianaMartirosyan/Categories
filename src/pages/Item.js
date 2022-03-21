import React, { Component } from 'react';
import Categories from '../Components/Categories';
import styles from '../pages/Item.module.css'

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      show: false
    }
  }

  componentDidMount() {

    fetch("https://api.thecatapi.com/v1/images/search?limit=10&page=1&category_ids=" + this.props.id)
      .then(response => {
        // console.log(response);
        if (!response.ok) {
          throw Error("error")
        }
        return response.json()

          .then(allData => {
            allData.forEach(element => console.log(element))

            this.setState({
              data: allData,
            })
          })
          .catch(err => {
            throw Error(err.message);
          })
      })
  }



  render() {
    let { data } = this.state;
    const onClickBack = () => {
      this.setState({ show: true });

    }
    return (
      <div>
        {this.state.show == false &&
          <>
            <button className={styles.backButton} onClick={() => onClickBack()}>Back</button>
            <div className={styles.itemBlocks}>

              {data.map(function (item, i) {

                return (

                  <div className={styles.itemEachBlock}>
                    <img src={item.url} key={i} />

                  </div>
                )
              })}


            </div>
          </>
        }

        {this.state.show == true && <Categories />}
      </div>

    );
  }
}

export default Item;