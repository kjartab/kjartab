import { RefObject, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import { Options } from "../core/leafletComponent";
import { LeafletMapContext, useLeaflet } from "../core/LeafletContext";
import { includes } from "../core/utils";


export const useLeafletComponent = <Element, Props, State = any>(
    { 
        name,
        create,
        update,
        destroy,
        leafletProps,
        leafletImmutableProps,
        provide
    }: Options<Element, Props, State>, 
    props: Props,
    ref: any):  [Partial<LeafletMapContext> | undefined, boolean, RefObject<HTMLDivElement>] =>  {
        const stateRef = useRef<State>();
                  
        const mountedRef = useRef(false);
        const ctx = useLeaflet();  
        const provided = useRef<Partial<LeafletMapContext> | undefined>(provide ? {} : undefined); 
        const initialProps = useRef<Props>(props);
        const prevProps = useRef<Props>({} as Props);
        const [mounted, setMounted] = useState(false);
        const element = useRef<Element>();
        const wrapperRef = useRef<HTMLDivElement>(null); 
        
  // Update properties
  const updateProperties = useCallback(
    (props: Props) => {
      if (!element.current) return;

      const target: any = element.current;

      const propsKeys = Object.keys(props) as (keyof Props)[]; 

      const propDiff = propsKeys
        .concat(
          (Object.keys(prevProps.current) as (keyof Props)[]).filter(k => !propsKeys.includes(k)),
        )
        .filter(k => prevProps.current[k] !== props[k])
        .map(k => [k, prevProps.current[k], props[k]] as [keyof Props, any, any]);
        
      const updatedImmutableProps: (keyof Props)[] = []; 
      for (const [k, prevValue, newValue] of propDiff) {
        if (includes(leafletProps, k)) {
          target[k] = newValue;
        } else if (includes(leafletImmutableProps, k)) {
          updatedImmutableProps.push(k);  
        }        
      }
          
      if (update && mountedRef.current) {
        update(element.current, props, prevProps.current, ctx);
      }
      
      prevProps.current = props;
      initialProps.current = props;
      
      
      // Recreate leaflet element when any read-only prop is updated
      if (mountedRef.current && updatedImmutableProps.length > 0) {

        if (process.env['NODE_ENV'] !== "production") {
          console.warn(
            `Warning: <${name}> is recreated because following read-only props have been updated: ${updatedImmutableProps.join(
              ", ",
            )}`,
          );
        } 

        unmount();
        mount();
      }
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

    const mount = useCallback(() => { 
      const result = create?.(ctx, initialProps.current, wrapperRef.current);
      if (Array.isArray(result)) {
        element.current = result[0];
        stateRef.current = result[1];
      } else {
        element.current = result;
      }
      
  
      prevProps.current = initialProps.current;

        
      if (provide && element.current) {
        provided.current = { ...ctx, ...provide(element.current, ctx, stateRef.current) };
      }
  
    
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const unmount = useCallback(() => {
      if (element.current && destroy) {
        destroy(element.current, ctx, wrapperRef.current, stateRef.current);
      }
      
   
      provided.current = undefined;
      stateRef.current = undefined;
      element.current = undefined;
  
      setMounted(false);
      mountedRef.current = false;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    // Detach all events 

    // To prevent re-execution by hot loader, execute only once
    useLayoutEffect(() => {
        mount();
        return () => unmount();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    // Update properties of leaflet element
    useEffect(() => {
      if (mounted) {
        if (!shallowEquals(props, prevProps.current)) {
          updateProperties(props);
        }
      } else {
        // first time
        prevProps.current = props;
        initialProps.current = props;
        setMounted(true);
        mountedRef.current = true;
      }
    }, [mounted, props, updateProperties]);
    
    // Expose leaflet element
    useImperativeHandle(ref, () => ({
        leafletElement: element.current
    }));
    
    return [provided.current, mounted, wrapperRef];
}

 

export function shallowEquals<T>(a1: T | null | undefined, a2: T | null | undefined) {
    return (
      !!a1 &&
      !!a2 &&
      [...Object.keys(a1), ...Object.keys(a2)].every(k => a1[k as keyof T] === a2[k as keyof T])
    );
  }
  