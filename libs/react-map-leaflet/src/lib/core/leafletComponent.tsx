import { forwardRef, ForwardRefExoticComponent, ForwardRefRenderFunction, HTMLAttributes, PropsWithoutRef, ReactElement, RefAttributes } from "react";
import { LeafletContext, LeafletMapContext } from "../core/LeafletContext";
import { useLeafletComponent } from "../hooks";
import { pick } from "./utils";

export type LeafletComponentRef<Element> = {
    leafletElement?: Element;
}; 
  
export type Options<Element, Props, State = any> = {
    name: string;
    create?: (
      ctx:  LeafletMapContext,
      props: Props,
      wrapperRef: HTMLDivElement | null,
    ) => Element | [Element, State] | undefined;  
    destroy?: (
        element: Element,
        ctx: LeafletMapContext,
        wrapperRef: HTMLDivElement | null,
        state?: State
      ) => void;
    update?: (element: Element, props: Props, prevProps: Props, context: LeafletMapContext) => void;
    provide?: (element: Element, ctx: LeafletMapContext, state?: State) => LeafletMapContext;
    leafletProps?: readonly (keyof Props)[]; 
    leafletImmutableProps?: readonly (keyof Props)[];
  };


export type LeafletComponentOptions<Element, Props, State = any> = Options<Element, Props, State> & { 
    renderContainer?: boolean;
    noChildren?: boolean;
    containerProps?: (keyof Props)[] | ((props: Props) => HTMLAttributes<HTMLDivElement>);
    defaultProps?: Partial<Props>;
};

export const createLeafletComponent = <Element, Props, State = any>({  
    renderContainer,
    noChildren,
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
        
        if (noChildren) return null;

        const children = mounted ? (mergedProps.children as ReactElement) : null;
        const wrappedChildren = renderContainer ? (
            <div
                data-testid="leaflet-container"
              ref={wrapperRef}
              {...(typeof containerProps === "function"
                ? containerProps(mergedProps)
                : pick(mergedProps, containerProps))}>
              {children}
            </div>
          ) : (
            children ?? null
          );
        
        if (provided) { 
            return <LeafletContext.Provider value={provided}>{wrappedChildren}</LeafletContext.Provider>;
        } 
        return wrappedChildren;
    } 
    component.displayName = options.name;
    
    return forwardRef(component);
}
