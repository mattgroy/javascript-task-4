'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let events = new Map();

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            if (!events.has(event)) {
                events.set(event, new Map());
            }

            let boundFunc = handler.bind(context);
            let contexts = events.get(event);
            if (!contexts.has(context)) {
                contexts.set(context, [boundFunc]);
            } else {
                contexts.get(context).push(boundFunc);
            }

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            for (let eventKey of events.keys()) {
                if (eventKey === event || eventKey.startsWith(event + '.')) {
                    events.get(eventKey).delete(context);
                }
            }

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            let splitEvents = event.split('.');
            for (let i = splitEvents.length; i > 0; i--) {
                let subEvent = splitEvents.slice(0, i).join('.');
                if (events.has(subEvent)) {
                    events.get(subEvent)
                        .forEach(context => context.forEach(handler => handler.call(context)));
                }
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         * @returns {Object}
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);

            return this;
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         * @returns {Object}
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);

            return this;
        }
    };
}

module.exports = {
    getEmitter,
    isStar
};
