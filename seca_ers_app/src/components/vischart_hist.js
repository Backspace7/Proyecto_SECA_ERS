import React, { Component } from 'react';
import Moment from 'moment';
import {HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
AreaSeries,
Crosshair,
DiscreteColorLegend,
FlexibleXYPlot} from 'react-vis';


export default class Vischart_hist extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      fetching:false,
      DATA:[],
      zonaprevia:0,
      fechaprev1:"2020-3-29",
      fechaprev2:"2020-4-11",
      crosshairValues: [],
      series: [{
        title: "Temperatura",
        disabled: false
      },
      {
        title: "Humedad",
        disabled: false
      },
      {
        title: "Radiacion Solar",
        disabled: false
      },
      {
        title: "Pre. Atmosferica",
        disabled: false
      },
      {
        title: "CO2",
        disabled: false
      }]
    };
  }
 async QueryList(zona,DateTo,DateFrom,TimeFrom,TimeTo){
      var data0 =await this.QueryData2(zona,5,DateFrom,DateTo,TimeFrom,TimeTo);
      var data1 =await this.QueryData2(zona,8,DateFrom,DateTo,TimeFrom,TimeTo);
      var data2 =await this.QueryData2(zona,13,DateFrom,DateTo,TimeFrom,TimeTo);
      var data3 =await this.QueryData2(zona,3,DateFrom,DateTo,TimeFrom,TimeTo);
      var data4 =await this.QueryData2(zona,10,DateFrom,DateTo,TimeFrom,TimeTo);
      var DATA = [];
      DATA.push(data0,data1,data2,data3,data4);
      this.setState({DATA:DATA});
 }
  async QueryData2(zona,suid,DateFrom,DateTo,TimeFrom,TimeTo){
       try {
        
         //cambiar el filtro de la url agregando las zonas, ya que hasta ahora estan todas catalogadas con null seria agregar &suid="+this.props.zona+"
          var url="http://192.168.0.4:3030/records?$limit=600&createdAt[$gte]='"+this.props.DateFrom+" "+this.props.TimeFrom+":00.000Z'&createdAt[$lte]='"+this.props.DateTo+" "+this.props.TimeTo+":00.000Z'&suid="+suid+"&$sort[createdAt]=-1";
          
          const reposResponse = await fetch(url,{method:'get',headers:{'Content-Type':'application/json',Accept:'application/json','Authorization':`Bearer ${localStorage.getItem('feathers-jwt')}`}});
          const userRepos = await reposResponse.json();
          
          var newdata = userRepos.data.map(obj => ({x: Date.parse(obj.createdAt), y:obj.dat}));
          this.setState({fetching:true});
          return newdata;
        }catch (error) {
          console.log(error);
        }
  }
  
  clickHandler = (item, i) => {
    const { series } = this.state;
    series[i].disabled = !series[i].disabled;
    this.setState({ series });
  };
  _onMouseLeave = () => {
    this.setState({crosshairValues: []});
  };
  _onNearestX = (value, {index}) => {
    this.setState({crosshairValues: this.state.DATA.map(d => d[index])});
  };

  render() {
    const { series,DATA } = this.state;
    const {zona,DateTo,DateFrom,TimeFrom,TimeTo} = this.props;
    if( this.state.zonaprevia!= zona || this.state.fechaprev1!=DateFrom || this.state.fechaprev2!=DateTo ){
      this.setState({DATA:[]});
      this.setState({zonaprevia:zona});
      this.setState({fechaprev1:DateFrom});
      this.setState({fechaprev2:DateTo});
      this.setState({fetching:false});
    }
    if(this.state.fetching==false && zona!=0){

      this.QueryList(zona,DateFrom,DateTo,TimeFrom,TimeTo);
    }
    return (
     <div style={{ width: '100%', height:'100%',padding:20}}>
        <DiscreteColorLegend
          onItemClick={this.clickHandler}
          width={450}
          items={series}
          orientation="horizontal"
        />
        <FlexibleXYPlot height={450} width={1200} margin={{left: 50, right: 50, top: 10, bottom: 30}}  tickTotal={10} onMouseLeave={this._onMouseLeave}  xType="time" >
          <VerticalGridLines />
          <HorizontalGridLines />
            
          <XAxis
              attr="x"
              attrAxis="y"
              orientation="bottom"
              title="Hour"

            />
            <YAxis
              attr="y"
              attrAxis="x"
              orientation="left"
              title="value"
              
            />
            {series[0].disabled ? null : <AreaSeries
              onNearestX={this._onNearestX}
              data={DATA[0]}
              opacity={series[0].disabled ? 0.1 : 0.5}
              strokeStyle="solid"
              color='#12939a'
              />}

               {series[1].disabled ? null : <AreaSeries
              onNearestX={this._onNearestX}
              data={DATA[1]}
              opacity={series[1].disabled ? 0.1 : 0.5}
              strokeStyle="solid"
              color='#79c7e3'
              />}
              {series[2].disabled ? null : <AreaSeries
              onNearestX={this._onNearestX}
              data={DATA[2]}
              opacity={series[2].disabled ? 0.1 : 0.5}
              strokeStyle="solid"
              color='#1a3177'
              />}
              {series[3].disabled ? null : <AreaSeries
              onNearestX={this._onNearestX}
              data={DATA[3]}
              opacity={series[3].disabled ? 0.1 : 0.5}
              strokeStyle="solid"
              color='#ff9833'
              />}
              {series[4].disabled ? null : <AreaSeries
              onNearestX={this._onNearestX}
              data={DATA[4]}
              opacity={series[4].disabled ? 0.1 : 0.5}
              strokeStyle="solid"
              color='#ef5d28'
              />}
          
          <Crosshair
            values={this.state.crosshairValues}
            titleFormat={(d) => ({title:  !!d[0] ? Moment(d[0].x).format("HH:mm") : 'null' })}

            itemsFormat={(d) => [{title: "temperatura °C", value:!!d[0] ? d[0].y : 'null' },{title: "humedad °C", value: !!d[1] ? d[1].y : 'null' },{title: "Rad Solar", value: !!d[2] ? d[2].y : 'null' },
            {title: "Pre Atmosferica", value: !!d[3] ? d[3].y : 'null' },{title: "CO2", value: !!d[4] ? d[4].y : 'null' }]}
            className={'test-class-name'}
           />
          

        </FlexibleXYPlot>
      </div>
    );
  }
}
