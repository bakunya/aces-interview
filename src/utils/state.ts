import { BehaviorSubject } from 'rxjs';

export type TState<T> = {
	getData: () => T;
	set: (v: T) => void;
	getId: () => string;
	subscribe: Function;
	instance: BehaviorSubject<{ id: string; data: T }>;
};

export function state<T>(id: string, initial: T): TState<T> {
	const s = new BehaviorSubject({
		id,
		data: initial,
	});

	const getId = () => s.getValue().id;
	const getData = () => s.getValue().data;
	const set = (v: T) => s.next({ ...s.value, data: v });

	return {
		set,
		getId,
		getData,
		instance: s,
		subscribe: s.subscribe.bind(s),
	};
}
