import React, { Component } from 'react';
import Item from '../pages/Item';
import styles from '../Styles/Categories.module.css';



class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {

    fetch("https://api.thecatapi.com/v1/categories")
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

    const onClickCategory = (id) => {
      this.setState({ itemId: id });
    }

    return (
      <>

        {
          !this.state.itemId &&
          <div>
            <h2>Clickable Categories</h2>
            <h3>Each category has its images</h3>
            <div className={styles.categoriesBlock}>

              {data.map(function (item, i) {
                return (
                  <>
                    <button key={i} onClick={() => onClickCategory(item.id)}>
                      <h1 > {item.name}  </h1>
                      <p>Category</p>
                    </button>

                  </>

                )
              })}
            </div>
          </div>
        }

        {
          this.state.itemId &&
          <Item id={this.state.itemId} />
        }

      </>
    );
  }
}

export default Categories