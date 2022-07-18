


const styles = StyleSheet.create({
body:{
    background: '#efefef',
  },
  
  tooltip:{
    height: 200,
    width: 300,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    box_shadow: '0px 5px 15px 0px rgba(0,0,0,0.3)',
  },
    
    arrow:{
      width: 50,
      height: 25,
      position: 'absolute',
      top: '100%',
      left: 50,
      transform: 'translateX(-50%)',
      overflow: 'hidden',
    },
      
    after:{
       content: "",
       position: 'absolute',
       width: 20,
       height: 20,
       background: 'white',
       transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
       top: 0,
       left: '50%',
       box_shadow: '1px 1px 20px 0px rgba(0,0,0,0.6)',
      }
    
});
  
  

  export default styles;