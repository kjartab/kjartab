import { Children, forwardRef, ForwardRefExoticComponent, ForwardRefRenderFunction, HTMLAttributes, PropsWithoutRef, ReactElement, RefAttributes, RefObject, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import { LeafletContext, LeafletMapContext, useLeaflet } from "../core/LeafletContext";

export type LeafletComponentRef<Element> = {
    leafletElement?: Element;
}; 
  
export type Options<Element, Props, State = any> = {
    name: string;
    create?: (
      ctx:  LeafletMapContext,
      props: Props
    ) => Element | [Element, State] | undefined;  
    destroy?: (
        element: Element,
        ctx: LeafletMapContext,
        wrapperRef: HTMLDivElement | null,
        state?: State
      ) => void;
    update?: (element: Element, props: Props, prevProps: Props, context: LeafletMapContext) => void;
    provide?: (element: Element, ctx: LeafletMapContext, state?: State) => LeafletMapContext;
  };

export type LeafletComponentOptions<Element, Props, State = any> = Options<Element, Props, State> & { 
    containerProps?: (keyof Props)[] | ((props: Props) => HTMLAttributes<HTMLDivElement>);
    defaultProps?: Partial<Props>;
};

export const useLeafletComponent = <Element, Props, State = any>(
    { 
        name,
        create,
        update,
        destroy,
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
    
      if (update && mountedRef.current) { 
        update(element.current, props, prevProps.current, ctx);
      } 
      
      prevProps.current = props;
      initialProps.current = props;
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

        const mount = useCallback(() => { 
            const result = create?.(ctx, props);
            if (Array.isArray(result)) {
              element.current = result[0];
              stateRef.current = result[1];
            } else {
              element.current = result;
            } 
            if (provide && element.current) {
                const provideRes = provide(element.current, ctx, stateRef.current); 
                provided.current = { ...ctx, ...provideRes}; 
            }
        
        }, []); // eslint-disable-line react-hooks/exhaustive-deps

        const unmount = useCallback(() => {
            // Destroy cesium element
            
            if (element.current && destroy) {
              destroy(element.current, ctx as LeafletMapContext, wrapperRef.current, stateRef.current);
            }
            
            stateRef.current = undefined;
            element.current = undefined;
            provided.current = undefined;   
            setMounted(false);
                    
                
        }, []); // eslint-disable-line react-hooks/exhaustive-deps
        // Detach all events 

        // To prevent re-execution by hot loader, execute only once
        useLayoutEffect(() => {
            mount();
            return () => unmount();
        }, []); // eslint-disable-line react-hooks/exhaustive-deps
        
        // Update properties of cesium element
        useEffect(() => {
            if (mounted) {
                updateProperties(props);
            } else {
                // first time 
                prevProps.current = props;
                initialProps.current = props;
                setMounted(true);
                mountedRef.current = true;
            }
        }, [mounted, props, updateProperties]);
        
        // Expose cesium element
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
  
export const createLeafletComponent = <Element, Props, State = any>({  
    containerProps,
    defaultProps,
    ...options
} : LeafletComponentOptions<Element, Props, State>):  
    ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<LeafletComponentRef<Element>>> => { 
        
        const component: ForwardRefRenderFunction<LeafletComponentRef<Element>, Props> = (props, ref) => { 
        const mergedProps = {
            ...defaultProps,
            ...props,
        };
        
        const [ provided, mounted, wrapperRef ] = useLeafletComponent<Element, Props, State>(
            options,
            mergedProps,
            ref);

        const children = mounted ? (mergedProps.children as ReactElement) : null;
        const wrappedChildren = (
            <div
              data-testid="resium-container"
              ref={wrapperRef} > 
              {children}
            </div>
          ) 
        
        if (provided) { 
            return <LeafletContext.Provider value={provided}>{wrappedChildren}</LeafletContext.Provider>;
        } 
        return wrappedChildren;
    } 
    component.displayName = options.name;
    
    return forwardRef(component);
}
