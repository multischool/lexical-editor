'use client';
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import * as React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import { $getTableColumnIndexFromTableCellNode, $getTableRowIndexFromTableCellNode, $insertTableColumn__EXPERIMENTAL, $insertTableRow__EXPERIMENTAL, $isTableCellNode, $isTableNode, TableNode, } from '@lexical/table';
import { $findMatchingParent, mergeRegister } from '@lexical/utils';
import { $getNearestNodeFromDOMNode } from 'lexical';
import { PlusIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useDebounce } from '../editor-hooks/use-debounce';
const BUTTON_WIDTH_PX = 20;
function TableHoverActionsContainer({ anchorElem, }) {
    const [editor] = useLexicalComposerContext();
    const isEditable = useLexicalEditable();
    const [isShownRow, setShownRow] = useState(false);
    const [isShownColumn, setShownColumn] = useState(false);
    const [shouldListenMouseMove, setShouldListenMouseMove] = useState(false);
    const [position, setPosition] = useState({});
    const tableSetRef = useRef(new Set());
    const tableCellDOMNodeRef = useRef(null);
    const debouncedOnMouseMove = useDebounce((event) => {
        const { isOutside, tableDOMNode } = getMouseInfo(event);
        if (isOutside) {
            setShownRow(false);
            setShownColumn(false);
            return;
        }
        if (!tableDOMNode) {
            return;
        }
        tableCellDOMNodeRef.current = tableDOMNode;
        let hoveredRowNode = null;
        let hoveredColumnNode = null;
        let tableDOMElement = null;
        editor.update(() => {
            var _a;
            const maybeTableCell = $getNearestNodeFromDOMNode(tableDOMNode);
            if ($isTableCellNode(maybeTableCell)) {
                const table = $findMatchingParent(maybeTableCell, (node) => $isTableNode(node));
                if (!$isTableNode(table)) {
                    return;
                }
                tableDOMElement = editor.getElementByKey(table === null || table === void 0 ? void 0 : table.getKey());
                if (tableDOMElement) {
                    const rowCount = table.getChildrenSize();
                    const colCount = (_a = table.getChildAtIndex(0)) === null || _a === void 0 ? void 0 : _a.getChildrenSize();
                    const rowIndex = $getTableRowIndexFromTableCellNode(maybeTableCell);
                    const colIndex = $getTableColumnIndexFromTableCellNode(maybeTableCell);
                    if (rowIndex === rowCount - 1) {
                        hoveredRowNode = maybeTableCell;
                    }
                    else if (colIndex === colCount - 1) {
                        hoveredColumnNode = maybeTableCell;
                    }
                }
            }
        });
        if (tableDOMElement) {
            const { width: tableElemWidth, y: tableElemY, right: tableElemRight, left: tableElemLeft, bottom: tableElemBottom, height: tableElemHeight, } = tableDOMElement.getBoundingClientRect();
            const { y: editorElemY, left: editorElemLeft } = anchorElem.getBoundingClientRect();
            if (hoveredRowNode) {
                setShownColumn(false);
                setShownRow(true);
                setPosition({
                    height: BUTTON_WIDTH_PX,
                    left: tableElemLeft - editorElemLeft,
                    top: tableElemBottom - editorElemY + 5,
                    width: tableElemWidth,
                });
            }
            else if (hoveredColumnNode) {
                setShownColumn(true);
                setShownRow(false);
                setPosition({
                    height: tableElemHeight,
                    left: tableElemRight - editorElemLeft + 5,
                    top: tableElemY - editorElemY,
                    width: BUTTON_WIDTH_PX,
                });
            }
        }
    }, 50, 250);
    // Hide the buttons on any table dimensions change to prevent last row cells
    // overlap behind the 'Add Row' button when text entry changes cell height
    const tableResizeObserver = useMemo(() => {
        return new ResizeObserver(() => {
            setShownRow(false);
            setShownColumn(false);
        });
    }, []);
    useEffect(() => {
        if (!shouldListenMouseMove) {
            return;
        }
        document.addEventListener('mousemove', debouncedOnMouseMove);
        return () => {
            setShownRow(false);
            setShownColumn(false);
            debouncedOnMouseMove.cancel();
            document.removeEventListener('mousemove', debouncedOnMouseMove);
        };
    }, [shouldListenMouseMove, debouncedOnMouseMove]);
    useEffect(() => {
        return mergeRegister(editor.registerMutationListener(TableNode, (mutations) => {
            editor.getEditorState().read(() => {
                for (const [key, type] of Array.from(mutations)) {
                    const tableDOMElement = editor.getElementByKey(key);
                    switch (type) {
                        case 'created':
                            tableSetRef.current.add(key);
                            setShouldListenMouseMove(tableSetRef.current.size > 0);
                            if (tableDOMElement) {
                                tableResizeObserver.observe(tableDOMElement);
                            }
                            break;
                        case 'destroyed':
                            tableSetRef.current.delete(key);
                            setShouldListenMouseMove(tableSetRef.current.size > 0);
                            // Reset resize observers
                            tableResizeObserver.disconnect();
                            tableSetRef.current.forEach((tableKey) => {
                                const tableElement = editor.getElementByKey(tableKey);
                                if (tableElement) {
                                    tableResizeObserver.observe(tableElement);
                                }
                            });
                            break;
                        default:
                            break;
                    }
                }
            });
        }, { skipInitialization: false }));
    }, [editor, tableResizeObserver]);
    const insertAction = (insertRow) => {
        editor.update(() => {
            if (tableCellDOMNodeRef.current) {
                const maybeTableNode = $getNearestNodeFromDOMNode(tableCellDOMNodeRef.current);
                maybeTableNode === null || maybeTableNode === void 0 ? void 0 : maybeTableNode.selectEnd();
                if (insertRow) {
                    $insertTableRow__EXPERIMENTAL();
                    setShownRow(false);
                }
                else {
                    $insertTableColumn__EXPERIMENTAL();
                    setShownColumn(false);
                }
            }
        });
    };
    if (!isEditable) {
        return null;
    }
    return (<>
      {isShownRow && (<button className={'EditorTheme__tableAddRows absolute flex w-[calc(100%-25px)] cursor-pointer items-center justify-center border-0 bg-accent hover:bg-accent/80'} style={Object.assign({}, position)} onClick={() => insertAction(true)}>
          <PlusIcon className="h-4 w-4"/>
        </button>)}
      {isShownColumn && (<button className={'EditorTheme__tableAddColumns absolute flex w-[calc(100%-25px)] cursor-pointer items-center justify-center border-0 bg-accent hover:bg-accent/80'} style={Object.assign({}, position)} onClick={() => insertAction(false)}>
          <PlusIcon className="h-4 w-4"/>
        </button>)}
    </>);
}
function getMouseInfo(event) {
    const target = event.target;
    if (target && target instanceof HTMLElement) {
        const tableDOMNode = target.closest('td.EditorTheme__tableCell, th.EditorTheme__tableCell');
        const isOutside = !(tableDOMNode ||
            target.closest('button.EditorTheme__tableAddRows') ||
            target.closest('button.EditorTheme__tableAddColumns') ||
            target.closest('div.TableCellResizer__resizer'));
        return { isOutside, tableDOMNode };
    }
    else {
        return { isOutside: true, tableDOMNode: null };
    }
}
export function TableHoverActionsPlugin({ anchorElem, }) {
    const isEditable = useLexicalEditable();
    if (!anchorElem) {
        return null;
    }
    return isEditable
        ? createPortal(<TableHoverActionsContainer anchorElem={anchorElem}/>, anchorElem)
        : null;
}
//# sourceMappingURL=table-hover-actions-plugin.jsx.map