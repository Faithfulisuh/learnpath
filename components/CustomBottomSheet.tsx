import React, { forwardRef, useImperativeHandle, useRef, useMemo } from 'react';
import { View, Text } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export interface CustomBottomSheetRef {
  present: (message: string) => void;
}

interface CustomBottomSheetProps {
  title?: string;
}

const CustomBottomSheet = forwardRef<CustomBottomSheetRef, CustomBottomSheetProps>(
  ({ title = 'Notice' }, ref) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['30%'], []);
    const [message, setMessage] = React.useState('');

    useImperativeHandle(ref, () => ({
      present: (msg: string) => {
        setMessage(msg);
        bottomSheetModalRef.current?.present();
      },
    }));

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        backdropComponent={() => <View className="flex-1 bg-black/50" />}
      >
        <View className="p-5">
          <Text className="mb-2 text-center font-pbold text-lg text-myblack">{title}</Text>
          <Text className="text-center text-gray-700">{message}</Text>
        </View>
      </BottomSheetModal>
    );
  }
);

export default CustomBottomSheet;
