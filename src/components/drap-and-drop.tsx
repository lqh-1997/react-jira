import React, { ReactNode } from 'react';
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from 'react-beautiful-dnd';

type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode };

export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          // cloneElement 复制一个子元素 并主动为其添加props 目的是简化子元素传入的props
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
          });
        }
        return <div />;
      }}
    </Droppable>
  );
};

// 用来定义可拖动的子元素类型 实际上就是上面所返回的那个类型 再加上divElement上面的一些属性比如说style之类的
type DropChildProps = Partial<{ provided: DroppableProvided } & DroppableProvidedProps> &
  React.HTMLAttributes<HTMLDivElement>;
// React.forwardRef用来转发ref 也就是说返回的元素上能够加上ref属性
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
    {props.provided?.placeholder}
  </div>
));

type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode };
export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef,
          });
        }
        return <div />;
      }}
    </Draggable>
  );
};
