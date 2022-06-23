import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import {
  selectCatList,
  getCatList,
  resetCatList,
} from '../../../store/features/counter/counterSlice';

export default function Counter() {
  const catList = useAppSelector(selectCatList);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button onClick={() => dispatch(getCatList())}>getCatList</button>
        <button onClick={() => dispatch(resetCatList())}>resetCatList</button>
        {catList.map((cat, index) => (
          <div key={index}>{JSON.stringify(cat)}</div>
        ))}
      </div>
    </div>
  );
}
