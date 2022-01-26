import { createRef } from "react"; 
import { createLeafletComponent, LeafletComponentRef } from "./leafletComponent";
import { render, screen } from "@testing-library/react";
import { LeafletContext } from "./LeafletContext";
import { LeafletMapContext } from ".";
import L from "leaflet";

beforeEach(() => {
    console.warn = jest.fn();
  });
  
  describe("core/component", () => {

    it("should create and expose Leaflet element correctly on initialized", () => {
        const create = jest.fn(() => "foobar");
        const value = { hoge: 1 };
    
        const Component = createLeafletComponent<string, { test: number }>({
          name: "test",
          create,
        });
    
        const ref = createRef<LeafletComponentRef<string>>();
    
        render(
          <LeafletContext.Provider value={value}>
            <Component test={1} ref={ref} />
          </LeafletContext.Provider>,
        );
    
        expect(create).toBeCalledWith(value, { test: 1 }, null);
        expect(create).toBeCalledTimes(1);
        expect(ref.current?.leafletElement).toBe("foobar");
      });

      it("should call destroy fn on unmounted", () => {
        const destroy = jest.fn();
        const value = { hoge: 1 };
    
        const Component = createLeafletComponent<string, { test: number }>({
          name: "test",
          create: () => "foobar",
          destroy,
        });
    
        render(
          <LeafletContext.Provider value={value}>
            <Component test={1} />
          </LeafletContext.Provider>,
        ).unmount();
    
        expect(destroy).toBeCalledWith("foobar", value, null, undefined);
        expect(destroy).toBeCalledTimes(1);
      });
      
      it("should update leaflet props", () => {
        const leafletElement = {
          foo: 0,
        };
    
        const Component = createLeafletComponent<typeof leafletElement, { foo?: number }>({
          name: "test",
          create: () => leafletElement,
          leafletProps: ["foo"],
        });
    
        const { rerender } = render(<Component />);
    
        expect(leafletElement.foo).toBe(0);
        
        rerender(<Component foo={1} />);
    
        expect(leafletElement.foo).toBe(1);
      });
    
    
  });