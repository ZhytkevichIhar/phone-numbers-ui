import React, { useCallback, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { usePhoneNumbers } from '../../contexts/PhoneNumbersProvider';

import './style.scss';

const PhoneNumbersList: React.FC = () => {
  const { numbers, removeNumber, reOrder, duplicatedIdx } = usePhoneNumbers();

  let listElem: HTMLDivElement | null = null;

  useEffect(() => {
    if (listElem && duplicatedIdx >= 0) {
      listElem.scrollTo(
        0,
        (duplicatedIdx * listElem.scrollHeight) / numbers.length,
      );
    } else if (duplicatedIdx === -1) {
      listElem?.scrollTo(0, 0);
    }
  }, [listElem, duplicatedIdx, numbers.length]);

  const onDragEnd = useCallback(
    result => {
      console.log(result);
      if (!result.destination) {
        return;
      }
      reOrder(result.source.index, result.destination.index);
    },
    [reOrder],
  );

  return (
    <div className="numbers-list card mt-3 p-2" ref={elem => (listElem = elem)}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="numbers" type="PhoneNumber">
          {(provided, snapshot) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {numbers.map((item, index) => {
                  return (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            className={
                              (index === duplicatedIdx
                                ? 'phone-number-list-item-dup '
                                : '') +
                              'phone-number-list-item d-flex justify-content-between bg-secondary text-white mb-1 px-2 py-1'
                            }
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <span>{item}</span>
                            <button
                              className="btn px-1 py-0"
                              onClick={() => removeNumber(item)}
                            >
                              <span className="fa fa-minus text-white"></span>
                            </button>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PhoneNumbersList;
