const classNames = (classNames) => classNames.join(' ');

const Button = ({ className = '', primary, secondary, ...props }) => {
  return (
    <button
      type="button"
      className={classNames([
        'bg-red-600 text-black border-none outline-none py-3 px-4 mx-2 my-2 rounded shadow-md font-bold opacity-80 flex flex-col justify-center items-center',
        'active:shadow-lg hover:opacity-100 disabled:bg-gray-300 disabled:text-gray-400 disabled:shadow-none',
        className,
        primary ? 'bg-blue-500 text-white active:bg-blue-400' : '',
        secondary ? 'bg-red-600 text-white active:bg-red-400' : '',
      ])}
      {...props}
    />
  );
};

const FloatingButton = ({ className = '', ...props }) => {
  return (
    <Button
      className={classNames([
        'absolute bottom-20 right-4 rounded-full text-[2.5em] w-[1.5em] h-[1.5em] p-2 z-50',
        className,
      ])}
      {...props}
    />
  );
};

const ButtonContainer = ({ className = '', children, ...props }) => {
  return (
    <div className={classNames(['relative', className])} {...props}>
      {children}
    </div>
  );
};

const ButtonAppContainer = ({ className = '', children, ...props }) => {
  return (
    <div className={classNames(['transform-gpu', className])} {...props}>
      {children}
    </div>
  );
};

export {
  Button as default,
  Button,
  FloatingButton,
  ButtonContainer,
  ButtonAppContainer,
};
