import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface PaginatedSelectProps {
    value?: any;
    placeholder?: string;
    useLazyQuery: any;
    getLabel: (item: any) => string;
    getValue: (item: any) => string;
    onChange: (value: any) => void;
    prependOption?: {
        label: string;
        value: string | undefined | any;
    };
}

export default function PaginatedSelect({
    value,
    placeholder,
    useLazyQuery,
    getLabel,
    getValue,
    onChange,
    prependOption,
}: PaginatedSelectProps) {
    const [trigger] = useLazyQuery();

    const [items, setItems] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchData = async (pageNo = 1, searchText = "", append = false) => {
        if (loading) return;
        setLoading(true);

        const res = await trigger(
            { page: pageNo, search: searchText },
            true,
        ).unwrap();

        setItems((prev) => (append ? [...prev, ...res.results] : res.results));
        setHasMore(res.hasMore);
        setLoading(false);
    };

    useEffect(() => {
        fetchData(1, "", false);
    }, []);

    const handleSearch = () => {
        setPage(1);
        fetchData(1, search, false);
    };

    const handleScroll = (e: any) => {
        const bottom =
            e.target.scrollHeight - e.target.scrollTop <=
            e.target.clientHeight + 10;

        if (bottom && hasMore && !loading) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchData(nextPage, search, true);
        }
    };

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder={value ? value : placeholder} />
            </SelectTrigger>

            <SelectContent className="p-0" onScroll={handleScroll}>
                {/* Search */}
                <div className="sticky top-0 z-10 bg-white p-2 border-b flex gap-2">
                    <input
                        className="w-full px-2 py-1 text-sm border rounded"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button
                        className="px-2 text-gray-600"
                        onClick={handleSearch}
                    >
                        <Search />
                    </button>
                </div>

                {prependOption && (
                    <>
                        <SelectItem value={prependOption.value}>
                            {prependOption.label}
                        </SelectItem>
                        <div className="border-b" />
                    </>
                )}
                {/* List */}
                {items.map((item) => (
                    <SelectItem key={getValue(item)} value={getValue(item)}>
                        {getLabel(item)}
                    </SelectItem>
                ))}

                {/* Loading */}
                {loading && (
                    <div className="py-2 text-center text-sm text-gray-500">
                        Loading...
                    </div>
                )}

                {!loading && items.length === 0 && (
                    <div className="py-2 text-center text-sm text-gray-500">
                        No results found
                    </div>
                )}
            </SelectContent>
        </Select>
    );
}
