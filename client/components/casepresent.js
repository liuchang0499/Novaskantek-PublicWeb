import React from 'react';
import { render } from 'react-dom';
import mobx from 'mobx';
import { observer, inject, toJS } from 'mobx-react';
import { Button } from 'antd';
import _Row from 'antd/lib/row';
import _Col from 'antd/lib/col';
import _Card from 'antd/lib/card';
import request from 'superagent';

const heading= '我们的专业来自于多例的行业应用';
const caseone= '案例一';
const casetwo= '案列二';
const casethree= '案列三';
const casefour= '案例四';
const styles = {
  centre:{
    textAlign:'center',
    marginTop:'35px',
    marginBottom:'25px',
  },
  heroImage: {
    width:'300px',
    height:'200px',
  },
  headingfont:{
    fontWeight: 'bold',
    fontSize: '28px'
  },
  straightline_long: {
    position: 'relative',
    content: '',
    marginBottom: '40px',
    height: '3px',
    backgroundColor: '#BFBFBF',
  },
  circle:{
    borderRadius:'50%',
    overflow:'hidden'
  },
  conpsize:{
    margin:'0',
    position:'relative',
    float:'left',
    width:'300px',
    height:'180px'
  },
  title:{
    fontSize:'16px',
    marginBottom: '10px',
    marginTop:'10px',
  },
  discription:{
    fontSize:'14px',
    marginBottom: '5px',
    marginTop:'5px',
  }
}
const CaseList = (inject('store')(function CaseList (props){
  function render(){
    return(
        <div>
          { props.store.solutionList.map(function(num){
            return(
              <_Card style={{  }} bordered={false} bodyStyle={{ padding: 0 }}>
                <div className="bg_gray">
                  <_Col span={6}><img src={ num.heroImage.url } style={styles.conpsize }/></_Col>
                  <_Col span={17} offset={1}>
                    <p style={ styles.title }>{ num.applicationName }</p>
                    <p style={ styles.discription }>{ num.applicationDescription }</p>
                  </_Col>
                </div>
              </_Card>
            )
          }) 
        }   
        </div>
      )
  }
    return observer({
    render,
  });
}));

const CasePresent = (inject('store')(function CasePresent (props){
   function componentDidMount(){
    console.log('Solution mount', this);
    request.get('/api/application')
      .end(function(err, res){
      console.log('list add successful');
      props.store.setSolutionList(res.body);
    })
  }

  function render(){
    return (
      <div style= {{ 'paddingTop': '120px', 'paddingBottom':'60px' }}>
       	<_Row type="flex" justify="center">
          <_Col><img style={styles.circle} src="http://fakeimg.pl/125x125/"/></_Col>
        </_Row>
    		<_Row>
          <_Col style={ styles.centre }><p style={ styles.headingfont }>{ heading }</p></_Col>
        </_Row>
        <_Row>
          <_Col span={16} offset={4}>
             <_Row>
              <_Col><CaseList></CaseList></_Col>
            </_Row>
          </_Col>
        </_Row>
      </div>
    )
  }
    return observer({
    componentDidMount,
    render,

  });
}));
  export default CasePresent;