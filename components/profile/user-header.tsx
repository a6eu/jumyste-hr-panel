'use client'

import { Skeleton } from '@mui/material'

const UserHeader = ({ loading, t }: { loading: boolean; t: (key: string) => string }) => {//+
    return (
        <div className="flex flex-wrap items-center gap-7 px-4 sm:px-0">
            {loading ? (
                <Skeleton
                    variant="circular"
                    width={235}
                    height={235}
                    animation="wave"
                />
            ) : (
                <div
                    className="size-[235px] bg-secondaryLight rounded-full ring-[3px] ring-primaryBlocks border-[15px] border-[#FDFCFA]"></div>
            )}
            <div>
                {loading ? (
                    <Skeleton width={200} height={30} animation="wave" />
                ) : (
                    <h2 className="font-semibold text-2xl mb-7">
                        HR Manager Profile
                    </h2>
                )}
                <div className="flex items-center gap-4 mt-4">
                    {loading ? (
                        <Skeleton
                            variant="rectangular"
                            width={72}
                            height={72}
                            animation="wave"
                        />
                    ) : (
                        <div className="bg-primaryBlocks size-[72px] rounded-lg"></div>
                    )}
                    <div>
                        {loading ? (
                            <>
                                <Skeleton width={180} height={24} />
                                <Skeleton width={120} height={18} />
                            </>
                        ) : (
                            <>
                                <span className="text-xl">
                                    АО &quot;Халык Банк&quot;
                                </span>
                                <p className="text-black/50">
                                    250 {t('profile.employees')}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserHeader
