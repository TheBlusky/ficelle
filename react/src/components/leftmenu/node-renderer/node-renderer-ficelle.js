import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './node-renderer-ficelle.css';
import { isDescendant } from './tree-data-utils';

class NodeRendererDefault extends Component {
    render() {
        const {
            scaffoldBlockPxWidth,
            toggleChildrenVisibility,
            connectDragPreview,
            connectDragSource,
            isDragging,
            canDrop,
            canDrag,
            node,
            draggedNode,
            path,
            treeIndex,
            isSearchMatch,
            isSearchFocus,
            buttons,
            className,
            style = {},
            didDrop,
            isOver:     _isOver,     // Not needed, but preserved for other renderers
            parentNode: _parentNode, // Needed for drag-and-drop utils
            endDrag:    _endDrag,    // Needed for drag-and-drop utils
            startDrag:  _startDrag,  // Needed for drag-and-drop utils
            ...otherProps,
        } = this.props;

        let handle;
        if (canDrag) {
            if (typeof node.children === 'function' && node.expanded) {
                // Show a loading symbol on the handle when the children are expanded
                //  and yet still defined by a function (a callback to fetch the children)
                handle = (
                    <div className={`loadingHandle`}>
                        <div className={`loadingCircle`}>
                            <div className={`loadingCirclePoint`} />
                            <div className={`loadingCirclePoint`} />
                            <div className={`loadingCirclePoint`} />
                            <div className={`loadingCirclePoint`} />
                            <div className={`loadingCirclePoint`} />
                            <div className={`loadingCirclePoint`} />
                            <div className={`loadingCirclePoint`} />
                            <div className={`loadingCirclePoint`} />
                            <div className={`loadingCirclePoint`} />
                            <div className={`loadingCirclePoint`} />
                            <div className={`loadingCirclePoint`} />
                            <div className={`loadingCirclePoint`} />
                        </div>
                    </div>
                );
            } else {
                // Show the handle used to initiate a drag-and-drop
                handle = connectDragSource((
                    <div className={`moveHandle`} />
                ), { dropEffect: 'copy' });
            }
        }

        const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
        const isLandingPadActive  = !didDrop && isDragging;

        return (
            <div
                style={{ height: '100%' }}
                {...otherProps}
            >
                {toggleChildrenVisibility && node.children && node.children.length > 0 && (
                    <div>
                        <button
                            type="button"
                            aria-label={node.expanded ? 'Collapse' : 'Expand'}
                            className={node.expanded ? `collapseButton` : `expandButton`}
                            style={{ left: -0.5 * scaffoldBlockPxWidth }}
                            onClick={() => toggleChildrenVisibility({node, path, treeIndex})}
                        />

                        {node.expanded && !isDragging &&
                            <div
                                style={{ width: scaffoldBlockPxWidth }}
                                className={`lineChildren`}
                            />
                        }
                    </div>
                )}

                <div className={`rowWrapper`}>
                    {/* Set the row preview to be used during drag and drop */}
                    {connectDragPreview(
                        <div
                            className={`row` +
                                (isLandingPadActive ? ` ${`rowLandingPad`}` : '') +
                                (isLandingPadActive && !canDrop ? ` ${`rowCancelPad`}` : '') +
                                (isSearchMatch ? ` ${`rowSearchMatch`}` : '') +
                                (isSearchFocus ? ` ${`rowSearchFocus`}` : '') +
                                (className ? ` ${className}` : '')
                            }
                            style={{
                                opacity: isDraggedDescendant ? 0.5 : 1,
                                ...style,
                            }}
                        >
                            {handle}

                            <div
                                className={`rowContents` +
                                    (!canDrag ? ` ${`rowContentsDragDisabled`}` : '')
                                }
                            >
                                <div className={`rowLabel`}>
                                    <span
                                        className={`rowTitle` +
                                            (node.subtitle ? ` ${`rowTitleWithSubtitle`}` : '')
                                        }
                                    >
                                        {typeof node.title === 'function' ?
                                            node.title({node, path, treeIndex }) :
                                            node.title
                                        }
                                    </span>

                                    {node.subtitle &&
                                        <span className={`rowSubtitle`}>
                                            {typeof node.subtitle === 'function' ?
                                                node.subtitle({node, path, treeIndex }) :
                                                node.subtitle
                                            }
                                        </span>
                                    }
                                </div>

                                <div className={`rowToolbar`}>
                                    {buttons && buttons.map((btn, index) => (
                                        <div key={index} className={`toolbarButton`}>
                                            {btn}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

NodeRendererDefault.propTypes = {
    node: PropTypes.object.isRequired,
    path: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])).isRequired,
    treeIndex: PropTypes.number.isRequired,
    isSearchMatch: PropTypes.bool,
    isSearchFocus: PropTypes.bool,
    canDrag: PropTypes.bool,
    scaffoldBlockPxWidth: PropTypes.number.isRequired,
    toggleChildrenVisibility: PropTypes.func,
    buttons: PropTypes.arrayOf(PropTypes.node),
    className: PropTypes.string,
    style: PropTypes.object,

    // Drag and drop API functions
    // Drag source
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource:  PropTypes.func.isRequired,
    parentNode:         PropTypes.object,          // Needed for drag-and-drop utils
    startDrag:          PropTypes.func.isRequired, // Needed for drag-and-drop utils
    endDrag:            PropTypes.func.isRequired, // Needed for drag-and-drop utils
    isDragging:         PropTypes.bool.isRequired,
    didDrop:            PropTypes.bool.isRequired,
    draggedNode:        PropTypes.object,
    // Drop target
    isOver:  PropTypes.bool.isRequired,
    canDrop: PropTypes.bool,
};

export default NodeRendererDefault;
