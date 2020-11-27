import { useEffect, useState, useRef } from "react"



export const useFetch = ( url ) => {

    /*la idea de isMounted es que mantenga la referencia cuando este hook esta vivo o cuando el componente que lo usa
        sigue montado 
    */
    const isMounted = useRef(true);
    const [state, setstate] = useState({data: null, loading: true, error: null});    

    useEffect( () => {

        return () => {
            isMounted.current = false;
        }

    },[]);

    useEffect(() => {

        setstate({data: null, loading:true, error: null});

        

        fetch(url)
            .then(resp => resp.json())
            .then(data => {

                setTimeout(() => {
                   
                    if(isMounted.current){
                        setstate({
                            loading: false,
                            error: null,
                            data: data
                        })
                    }else{
                        console.log('setState no se llamo');
                    }

                }, 4000);

            });
    },[url]);

    return state;

}
