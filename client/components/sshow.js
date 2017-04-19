import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { render } from 'react-dom';
import mobx from 'mobx';
import { observer, inject, toJS } from 'mobx-react';
import request from 'superagent';
import { Row, Col, Button } from 'antd';
import _Card from 'antd/lib/card';

const name= "100ml 玻璃瓶 B1";
const description= "Glass bottle 100ml";
const descriptor= "AMPTS II (CO2吸收单元)";
const price= "￥1000";
const button_buy= "购  买";
const button_load= "加载更多";

const styles = {
  fontbold:{
    fontWeight: 'bold',
    fontSize: '23px'
  },
  fontprice:{
    fontWeight: 'bold',
    fontSize: '20px'
  },
  straightline: {
    position: 'relative',
    content: '',
    marginBottom: '20px',
    width: '230px',
    height: '1px',
    backgroundColor: '#777'
  },
  fontmiddle:{
    fontSize: '14px',
    marginBottom: '20px',
  },
  imgsize:{
    width: '243px',
    height: '353px',
    marginBottom: '20px',
  },
  button_buy:{
   width:'80px',
   height:'35px',
   fontSize:'16px',
   paddingBottom:'10px'
  },
  button_load:{
   width:'100px',
   height:'40px',
   fontSize:'17px'
  },
  rowspace:{
    padding:'20px 10px',
  }
}

const Product = function Product(props) {
  function render() {
    return (
      <_Card bodyStyle={{ padding: 0, textAlign: 'center' }}>
        <div className="custom-card">
          <h3 style={ styles.fontbold }>{ props.name }</h3>
          <p style={ styles.fontmiddle }>{ props.description }  {descriptor} </p>

        </div>
        <div>
          <img style={{margin: 'auto auto'}} src="http://fakeimg.pl/150x150" />
        </div>
        <p >{ price }</p>
        <p>
          <Button type="ghost" >{ button_buy }</Button>
        </p>
      </_Card>
    )
  }
  return render();
}

const ProductList = (inject('store')(function ProductList (props){
  function render(){
    return(
        <Row style={styles.rowspace}>
          { props.store.sampleList.map(function(num){
            return(
              <Col span={4} offset={2}>
               <Product name={ num.accessoriesName} description={ num.accessoriesDescription}></Product>
              </Col>
            )
          }) 
        }   
        </Row>
      )
    }
    return observer({
    render,
  });
}));



const Sshow = (inject('store')(function Sshow (props){
    function componentDidMount(){
    console.log('Sshow mount', this);
    request.get('/api/accessories')
      .end(function(err, res){
      console.log('list add successful');
      props.store.setSampleList(res.body);
    })
  }
  function render(){
    return (
        <div style={{ paddingTop: '200px', 'paddingBottom':'60px'}}>
          <Row>
            <Col span={4} offset={2} >
              <Product/>
            </Col>
            <Col span={4} offset={1}>
               <Product/>
            </Col>
            <Col span={4} offset={1}>
              <Product/>
            </Col>
            <Col span={4} offset={1}>
             <Product/>
            </Col>
          </Row>
          <Row style={styles.rowspace}>
            <Col span={4} offset={2} >
              <Product/>
            </Col>
            <Col span={4} offset={1}>
               <Product/>
            </Col>
            <Col span={4} offset={1}>
              <Product/>
            </Col>
            <Col span={4} offset={1}>
             <Product/>
            </Col>
          </Row>
          <Row style={styles.rowspace}>
            <ProductList></ProductList>
          </Row>
          <Row>
            <Col span={3} offset={11}> <Button type="ghost" style={styles.button_load}>{ button_load }</Button> </Col>
          </Row>
      </div>
    )
  }
return observer({
    componentDidMount,
    render,
  });
}));
export default Sshow;